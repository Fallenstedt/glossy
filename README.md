## Glossy helps you document your code

```
const array = [15, 16, 17, 18, 19];

function reducer(previous, current, index, array) {
	const returns = previous + current;
	console.log(
				`previous: ${previous},
					current: ${current}, index: ${index},
					returns: ${returns}`
				);
	return returns;
}

array.reduce(reducer);
```

0. This app provide a means to add annotations to lines of code in a verbatim block.
1. You can modify the comments in the code above.
2. Then export this as markdown for your next blog post.
