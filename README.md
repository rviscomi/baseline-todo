# baseline-todo

Annotate your code with reminders to use Baseline features when ready

The reminders are set as inline code comments, in the context of the relevant parts of the application that should use the Baseline feature.

The format of the comments uses a special syntax to annotate which feature you care about. It's an extension of the TODO comment pattern that developers already frequently use:

- The `TODO` keyword at the start of the comment
- Opening parenthesis `(`
- The keyword `baseline/`
- The ID of the Baseline feature
- Closing parenthesis `)`
- An optional colon `:` followed by a command

Use a `TODO` comment to declare your intent to migrate to the Baseline feature when ready. Some developer tools may watch for an individual feature's Baseline availability and proactively notify you when your TODO can be addressed.

Some developer tools may also attempt to alert you if you're using an unguarded feature that isn't Baseline, but the presence of a `TODO` indicates that you understand the risks and so any alerts for it should be silenced.

Note: End-user developer tooling like PageSpeed Insights or browser DevTools would need visibility into your code comments in order to reliably assess your app's Baseline status. If sourcemaps are available, the tools should assess the comments from the source code. Otherwise, you may need to make changes to your build process to preserve baseline-todo comments.

The optional command at the end of the comment could be used as a reminder to yourself about what migration steps need to be taken. In a future with AI-powered tooling, this command could also be fed to the LLM as an instruction to hanlde the migration automatically.

## Examples

Here are some language-specific examples and use cases.

### HTML

An HTML comment to annotate polyfill code that will become obsolete:

```html
<!-- TODO(baseline/loading-lazy): Replace class and data-src with loading=lazy and src. -->
<img class="lazyload" data-src="dog.webp" alt="Maizie">
```

### CSS

A CSS comment to flag vendor-prefixed properties that will become obsolete:

```css
p {
  /* TODO(baseline/line-clamp): Remove the vendor prefixed property. */
  -webkit-line-clamp: 2;
  line-clamp: 2;
  overflow: hidden;
}
```

A CSS comment to indicate that you are knowingly using a feature that is not Baseline:

```css
:root {
  /* TODO(baseline/accent-color) */
  accent-color: fuchsia;
}
```

Note: In this case, [`accent-color`](https://developer.mozilla.org/en-US/docs/Web/CSS/accent-color) is technically Baseline Limited availability due to a color contrast issue in Safari on iOS. But this may be a tolerable risk while getting use out of the feature everywhere else, so this comment can also be used to suppress any tooling alerts.

### JavaScript

A JavaScript comment to flag fallback code for an API that is not Basline:

```js
// TODO(baseline/api.Scheduler.yield) Remove this function.
function yieldToMain() {
  if (globalThis.scheduler?.yield) {
    return scheduler.yield();
  }

  return new Promise(resolve => {
    setTimeout(resolve, 0);
  });
}

async function example() {
  // TODO(baseline/api.Scheduler.yield) Use scheduler.yield directly without fallbacks.
  await yieldToMain();
}
```

Here's how an LLM would currently handle this migration task:

<img width="994" alt="Gemini 2.0 Flash resolving the TODOs" src="img/migrate-yield.png" />

## Possible tooling add-ons

Developers can stay on top of Baseline availability for the features they care about in the tools they already use. This section explores some of those opportunities:

- Feature ID code completion and validation
- GitHub action to file an issue when the feature is ready
- GitHub action to open a PR with AI-assisted changes migrating to the feature
