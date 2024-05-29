export const parseCustomURLParams = (url) => {
  const paramsString = url.substring(url.lastIndexOf("/", url.length - 2));
  console.log("paramsString", paramsString);

  const params = new URLSearchParams();
  const pairs = paramsString.split(";");
  console.log("pairs", pairs);

  pairs.forEach((pair) => {
    const [key, value] = pair
      .split("=")
      .map((item) => item.replace(/^\/|\/$/g, "").trim());
    params.append(key, value);
  });

  for (const [key, value] of params.entries()) {
    console.log(`${key}: ${value}`);
  }
  console.log("params", params);
  return params;
};
