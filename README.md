## Glossy helps you document your code

```
const array = [15, 16, 17, 18, 19];①

function reducer(previous, current, index, array) {②
	const returns = previous + current;
	console.log(
				`previous: ${previous},
					current: ${current}, index: ${index},
					returns: ${returns}`
				);
	return returns;
}

array.reduce(reducer);③
```

1. This app provide a means to add annotations to lines of code in a verbatim block.
2. You can modify the comments in the code above.
3. Then export this as markdown for your next blog post.
