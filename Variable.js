let count = 0;
doSomething = (value = []) => {
  count += 1;
  console.log(`🚀 ~ Total times the function is Called:${count}`);
  if (count == 5) {
    return console.log(`🚀 ~ Maximum Limit Exceeded${count}`);
  }
  if (value.length === 0) {
    return doSomething([1]);
  }
  if (value.length == 2) {
    return doSomething([1]);
  }
  return {
    actualValue: value,
    length: value.length,
  };
};

const getData = async () => {
  let response = await fetch("https://jsonplaceholder.typicode.com/users");
  const variable1 = await response.json();
  console.log("🚀 ~ getData ~ data:", variable1);
  return data;
};

getData();
