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

1. This app helps you explain what some code does.
2. You can add annotate specific lines of code.
3. Then export this as markdown or PNG for your next blog post.
