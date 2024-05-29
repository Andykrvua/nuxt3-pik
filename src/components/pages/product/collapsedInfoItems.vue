<template>
  <div class="product-page-maininfo-collaps-wrapper">
    <Collaps class="product-page-maininfo-collaps">
      <template #label>
        <BaseIconSvg iconName="shelves" width="24" height="24" />
        {{ $t("product.collapsedAvailability") }}
        <BaseIconSvg iconName="arrow-right" width="24" height="24" />
      </template>
      <template #body>
        <div class="collapse-content">
          <div class="stock-item">
            <p>Гуртівня “Час-Пік” м. Львів</p>
            <div />
            <p class="stock-item__value">125 шт.</p>
          </div>
          <div class="stock-item">
            <p>Гуртівня “КОРОЛІВСТВО КАНЦТОВАРІВ” м. Луцьк</p>
            <div />
            <p class="stock-item__value">125 шт.</p>
          </div>
          <div class="stock-item">
            <p>Магазин “Час-Пік” м. Стрий</p>
            <div />
            <p class="stock-item__value">125 шт.</p>
          </div>
          <div class="stock-item">
            <p>Магазин “Час-Пік” м. Самбір</p>
            <div />
            <p class="stock-item__value">5 шт.</p>
          </div>
          <div class="stock-item">
            <p>Магазин “Час-Пік” м. Червоноград</p>
            <div />
            <p class="stock-item__value">2 235 шт.</p>
          </div>
          <div class="stock-item">
            <p>Магазин “Час-Пік” м. Дрогобич</p>
            <div />
            <p class="stock-item__value">125 шт.</p>
          </div>
        </div>
      </template>
    </Collaps>
    <Collaps class="product-page-maininfo-collaps">
      <template #label>
        <BaseIconSvg iconName="local-shiping" width="24" height="24" />
        {{ $t("product.collapsedDelivery") }}
        <BaseIconSvg iconName="arrow-right" width="24" height="24" />
      </template>
      <template #body>
        <div class="collapse-content">
          <div class="deliveri-options">
            <p>{{ $t("product.collapsedDeliveryTxt1") }}</p>
            <div>
              <p>{{ $t("product.collapsedDeliveryTxt2") }}</p>
              <p>{{ $t("product.collapsedDeliveryTxt3") }}</p>
            </div>
            <p>{{ $t("product.collapsedDeliveryTxt4") }}</p>
            <div>
              <p>{{ $t("product.collapsedDeliveryTxt5") }}</p>
            </div>
            <NuxtLink
              no-prefetch
              class="deliveri-options__link"
              :to="localePath(linksHelper.deliveryandpayment)"
              >{{ $t("product.linkCollapsedDelivery") }}</NuxtLink
            >
          </div>
        </div>
      </template>
    </Collaps>
    <Collaps class="product-page-maininfo-collaps">
      <template #label>
        <BaseIconSvg iconName="balance-wallet" width="24" height="24" />
        {{ $t("product.collapsedPayment") }}
        <BaseIconSvg iconName="arrow-right" width="24" height="24" />
      </template>
      <template #body>
        <div class="collapse-content">
          <p class="payment-options-item">
            {{ $t("product.collapsedPaymentTxt1") }}
          </p>
          <p class="payment-options-item">
            {{ $t("product.collapsedPaymentTxt2") }}
          </p>
          <NuxtLink
            no-prefetch
            class="payment-options-link"
            :to="localePath(linksHelper.payment)"
            >{{ $t("product.linkCollapsedPayment") }}</NuxtLink
          >
        </div>
      </template>
    </Collaps>
    <Collaps class="product-page-maininfo-collaps">
      <template #label>
        <BaseIconSvg iconName="verified-user" width="24" height="24" />
        {{ $t("product.collapsedWarranty") }}
        <BaseIconSvg iconName="arrow-right" width="24" height="24" />
      </template>
      <template #body>
        <div class="collapse-content">
          <p class="waranty-options-item">
            {{ $t("product.collapsedWarrantyTxt1") }}
          </p>
          <NuxtLink no-prefetch class="waranty-options-link" to="/">{{
            $t("product.linkCollapsedWarranty")
          }}</NuxtLink>
        </div>
      </template>
    </Collaps>
  </div>
</template>
