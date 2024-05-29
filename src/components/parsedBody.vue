<script setup>
const props = defineProps({
  body: {
    type: String,
    default: "",
  },
  contentblocks: {
    type: [Array, undefined],
    default: undefined,
  },
  toc: {
    type: Boolean,
    default: false,
  },
});
console.log("contentblocks", props.contentblocks);
console.log("parsedbody", props.body);

function extractSpoilerBlocks(htmlText) {
  const regex = /(<p>\[spoiler_start\]<\/p>)(.*?)<p>\[spoiler_end\]<\/p>/gs;
  let match = regex.exec(htmlText);

  if (!match) {
    return [{ type: "text", content: htmlText }];
  }

  const spoilers = [];
  let lastIndex = 0;

  while (match !== null) {
    spoilers.push({
      type: "text",
      content: htmlText.substring(lastIndex, match.index),
    });
    spoilers.push({ type: "spoiler", content: match[2] });
    lastIndex = regex.lastIndex;
    match = regex.exec(htmlText);
  }
  if (lastIndex < htmlText.length) {
    spoilers.push({ type: "text", content: htmlText.substring(lastIndex) });
  }

  return spoilers.length > 0 ? spoilers : [{ type: "text", content: htmlText }];
}

function parseShortcode(htmlText) {
  const regex = /<p>\[(\w+):(\d+)\]<\/p>/;
  const match = regex.exec(htmlText);

  if (!match) {
    return;
  }

  const shortcodeType = match[1];
  const shortcodeId = match[2];
  let content = false;

  if (props.contentblocks && props.contentblocks?.length) {
    if (shortcodeType === bodyTypes.slider) {
      const data = props.contentblocks.filter(
        (item) =>
          item.type === bodyTypes.slider && item.id === Number(shortcodeId)
      );
      content =
        data?.length && data[0]?.data?.products && data[0].data.products?.length
          ? data[0].data.products
          : false;
    }
    if (shortcodeType === bodyTypes.faq) {
      const data = props.contentblocks.filter(
        (item) => item.type === bodyTypes.faq && item.id === Number(shortcodeId)
      );
      content =
        data?.length && data[0]?.data?.items && data[0].data.items?.length
          ? data[0].data.items
          : false;
    }
  }

  const parsedData = [
    {
      type: shortcodeType,
      id: shortcodeId,
      content,
    },
  ];

  const contentBefore = htmlText.substring(0, match.index);
  const contentAfter = htmlText.substring(match.index + match[0].length);

  if (contentBefore.length > 0) {
    parsedData.unshift({ type: "text", content: contentBefore });
  }

  if (contentAfter.length > 0) {
    parsedData.push({ type: "text", content: contentAfter });
  }

  return parsedData;
}

function processBodyData(parsingArray) {
  for (let i = 0; i < parsingArray.length; i++) {
    if (parsingArray[i].type === "text") {
      const parsedContent = parseShortcode(parsingArray[i].content);

      if (Array.isArray(parsedContent)) {
        parsingArray.splice(i, 1);
        parsingArray.splice(i, 0, ...parsedContent);
      }
    }
  }
  return parsingArray;
}

let tocBlock = null;
function createToc(htmlText) {
  function addIdsToHeaders(htmlString) {
    const headerRegex = /<(h[1-6])>(.*?)<\/\1>/gi;

    function addId(match, tag, content) {
      const id = content.toLowerCase().replace(/[^a-zA-Z0-9а-яА-Я]/g, "-");
      return `<${tag} id="${id}">${content}</${tag}>`;
    }

    const updatedHtml = htmlString.replace(headerRegex, addId);

    return updatedHtml;
  }

  function findHTMLHeaders(htmlString) {
    const headers = [];
    const headerRegex = /<h([1-6])\s*id="([^"]*)">(.*?)<\/h[1-6]>/gi;
    let match;

    while ((match = headerRegex.exec(htmlString)) !== null) {
      const level = parseInt(match[1]);
      const id = match[2];
      const title = match[3];

      const header = { id, title, children: [] };

      let parentIndex = headers.length - 1;
      while (parentIndex >= 0 && headers[parentIndex].level >= level) {
        parentIndex--;
      }

      if (parentIndex >= 0) {
        headers[parentIndex].children.push(header);
      } else {
        headers.push(header);
      }

      header.level = level;
    }

    console.log("headers", headers);
    return headers;
  }

  const newHtmlText = addIdsToHeaders(htmlText);
  tocBlock = findHTMLHeaders(newHtmlText);
  return newHtmlText;
}

const runParse = () => {
  let rawData = extractSpoilerBlocks(
    props.toc ? createToc(props.body) : props.body
  );
  tocBlock && tocBlock.length
    ? rawData.unshift({ type: bodyTypes.toc, content: tocBlock })
    : null;
  console.log(rawData);
  return processBodyData(rawData);
};

const data = runParse();
console.log("finishparsedata", data);
console.log("tocBlock", tocBlock);
</script>

<template>
  <div class="parsed-body" v-for="(body, ind) in data" :key="ind">
    <LazyPagesPostToc v-if="body.type === bodyTypes.toc" :data="body.content" />
    <div
      v-if="body.type === bodyTypes.text"
      class="vhtml"
      v-html="body.content"
    />
    <Collaps
      v-else-if="body.type === bodyTypes.spoiler"
      class="read-more-collaps"
      :closeText="$t('common.spoilerHide')"
    >
      <template #label>{{ $t("common.spoilerShow") }}</template>
      <template #body>
        <div class="vhtml" v-html="body.content" />
      </template>
    </Collaps>
    <div
      class="parsed-body__slider__wrapper"
      v-else-if="body.type === bodyTypes.slider && body.content"
    >
      <SlidersProductsSlider
        :variant="productsSlider.productPage"
        :data="body.content"
        class="parsed-body__slider"
      />
    </div>
    <template v-else-if="body.type === bodyTypes.faq && body.content">
      <Collaps
        class="faq-collaps"
        v-for="(faq, ind) in body.content"
        :key="ind"
      >
        <template #label>
          <div v-html="faq.question" />
          <BaseIconSvg iconName="arrow-right" width="24" height="24" />
        </template>
        <template #body>
          <div class="collapse-content">
            <div v-html="faq.answer" />
          </div>
        </template>
      </Collaps>
    </template>
  </div>
</template>
