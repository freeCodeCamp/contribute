# How to work on coding challenges

Our goal is to develop a fun and clear interactive learning experience.

Designing interactive coding challenges is difficult. It would be much easier to write a lengthy explanation or to create a video tutorial. But for our core curriculum, we're sticking with what works best for most people - a fully interactive, video game-like experience.

We want campers to achieve a flow state. We want them to build momentum and blast through our curriculum with as few snags as possible. We want them to go into the projects with confidence and gain wide exposure to programming concepts.

Note that for Version 7.0 of the freeCodeCamp curriculum, we are moving toward [an entirely project-focused model with a lot more repetition](https://www.freecodecamp.org/news/python-curriculum-is-live/).

Creating these challenges requires immense creativity and attention to detail. There's plenty of help available. You'll have support from a whole team of contributors to whom you can bounce ideas off and demo your challenges.

And as always, feel free to ask questions on the ['Contributors' category on our forum](https://forum.freecodecamp.org/c/contributors) or [the contributors chat room](https://discord.gg/PRyKn3Vbay).

With your help, we can design an interactive coding curriculum that will help millions of people learn to code for years to come.

The content for each challenge is stored in its markdown file. This markdown file is later converted to HTML using our tools to create interactive web pages.

You can find all of freeCodeCamp.org's curricular content in the [`/curriculum/challenges`](https://github.com/freeCodeCamp/freeCodeCamp/tree/main/curriculum/challenges) directory.

## Set up the tooling for the curriculum

Before you work on the curriculum, you would need to set up some tooling to help you test your changes. You can use any option from the below:

- You can [set up freeCodeCamp locally](how-to-setup-freecodecamp-locally.md). This is **highly recommended** for regular/repeat contributions. This setup allows you to work and test your changes.
- Use Gitpod, a free online dev environment. Clicking the button below will start a ready-to-code dev environment for freeCodeCamp in your browser. It only takes a few minutes.

  [![Open in Gitpod](https://gitpod.io/button/open-in-gitpod.svg)](https://gitpod.io/#https://github.com/freeCodeCamp/freeCodeCamp)

### How to work on practice projects

The practice projects have some additional tooling to help create new projects and steps. To read more, see [these docs](how-to-work-on-practice-projects.md)

## Challenge Template

````md
---
id: Unique identifier (alphanumerical, MongoDB_id)
title: 'Challenge Title'
challengeType: Integer, defined in `client/utils/challenge-types.js`
videoUrl: 'url of video explanation'
forumTopicId: 12345
---

# --description--

Challenge description text, in markdown

```html
<div>example code</div>
```

# --instructions--

Challenge instruction text, in markdown

# --hints--

Tests to run against user code, in pairs of markdown text and code block test code.

```js
Code for test one
```

If you want dynamic output based on the user's code, --fcc-expected-- and --fcc-actual-- will be replaced with the expected and actual values of the test's assertion. Take care if you have multiple assertions since the first failing assertion will determine the values of --fcc-expected-- and --fcc-actual--.

```js
assert.equal(
  'this will replace --fcc-actual--',
  'this will replace --fcc-expected--'
);
```

# --notes--

Extra information for a challenge, in markdown

# --seed--

## --before-user-code--

```lang
Code evaluated before the user’s code.
```

## --after-user-code--

```lang
Code evaluated after the user’s code, and just before the tests
```

## --seed-contents--

Boilerplate code to render to the editor. This section should only contain code inside backticks, like the following:

```html
<body>
  <p class="main-text">Hello world!</p>
</body>
```

```css
body {
  margin: 0;
  background-color: #3a3240;
}

.main-text {
  color: #aea8d3;
}
```

```js
console.log('freeCodeCamp is awesome!');
```

# --solutions--

Solutions are used for the CI tests to ensure that changes to the hints will still pass as intended

```js
// first solution - the language(s) should match the seed.
```

---

```js
// second solution - so if the seed is written in HTML...
```

---

```js
// third solution etc. - Your solutions should be in HTML.
```

# --assignments--

This will show a checkbox that campers have to check before completing a challenge

---

This will show another checkbox that campers have to check before completing a challenge

# --question--

These fields are currently used for the multiple-choice Python challenges.

## --text--

The question text goes here.

## --answers--

Answer 1

### --feedback--

This will be shown as feedback when campers guess this answer

---

Answer 2

---

More answers

## --video-solution--

The number for the correct answer goes here.

# --fillInTheBlank--

These are for the English curriculum challenges.

## --sentence--

Sentence to be shown with with blanks that campers have to fill in. Example:

`Hello, You _ the new graphic designer, _?`

The two underscores will show up as blanks. The sentence must be surrounded in backticks.

## --blanks--

The solution for the first blank in the sentence above. Example:

`are`

### --feedback--

Feedback shown when campers input the wrong solution for this blank.

---

Solution for the second blank. Example:

`right`

If no feedback is here, a generic "wrong answer" message will be shown.

# --scene--

```json
// # --scene-- can only consist of a single json object
{
  // Setup the scene. Properties not marked optional are required.
  "setup": {
    // Background file to start the scene. A list of scene asset filenames can be found here: https://github.com/freeCodeCamp/cdn/pull/233/files
    "background": "company2-center.png",
    // Array of all characters that will appear in the scene
    "characters": [
      {
        // Name of character. See list of available characters in scene-assets.tsx
        "character": "Maria",
        // Where to start the character. Maria will start off screen to the left
        "position": { "x": -25, "y": 0, "z": 1 }
      },
      {
        "character": "Tom",
        // Tom will start 70% from the left of the screen and 1.5 times regular size
        "position": { "x": 70, "y": 0, "z": 1.5 },
        // Optional, defaults to 1. Tom will start invisible
        "opacity": 0
      }
    ],
    "audio": {
      // Audio filename
      "filename": "1.1-1.mp3",
      // Seconds after the scene starts before the audio starts playing
      "startTime": 1.3,
      // Optional. Timestamp of the audio file where it starts playing from.
      "startTimestamp": 0,
      // Optional. Timestamp of the audio file where is stops playing. If these two aren't used, the whole audio file will play.
      "finishTimestamp": 8.4
    },
    // Optional, defaults to false. Use this for the long dialogues. It stops the accessibility icon from showing which gives campers the option to show or hide the dialogue text
    "alwaysShowDialogue": true 
  },
  // Array of commands that make up the scene
  "commands": [
    {
      // Character that will have an action for this command
      "character": "Maria",
      // Optional, defaults to previous value. Maria will move to 25% from the left of the screen. The movement takes 0.5 seconds
      "position": { "x": 25, "y": 0, "z": 1 },
      // When the command will start. Zero seconds after the camper presses play
      "startTime": 0
    },
    {
      "character": "Tom",
      // Optional, defaults to previous value. Tom will fade into view. The transition take 0.5 seconds. Movement and Opacity transitions take 0.5 seconds
      "opacity": 1, 
      // Tom will fade into view 0.5 seconds into the scene (immediately after Maria finishes moving on screen)
      "startTime": 0.5
    },
    {
      "character": "Maria",
      // When the command starts: Maria will start saying this line 1.3 seconds into the scene. Note that this is the same time as the audio.startTime above. It doesn't have to match that (maybe there's a pause at the beginning of the audio or something)
      "startTime": 1.3,
      // The character will stop moving their mouth at the finishTime
      "finishTime": 4.95,
      "dialogue": {
        // Text that will appear if the dialogue is visible
        "text": "Hello! You're the new graphic designer, right? I'm Maria, the team lead.",
        // Where the dialogue text will be aligned. Can be 'left', 'center', or 'right'
        "align": "left"
      }
    },
    {
      // background will change to this at 5.4 seconds into the scene
      "background": "company2-breakroom.png",
      "character": "Tom",
      "startTime": 5.4,
      "finishTime": 9.4,
      "dialogue": {
        "text": "Hi, that's right!  I'm Tom McKenzie. It's a pleasure to meet you.",
        // Tom's text will be aligned to the right since he is on the right side of the screen
        "align": "right"
      }
    },
    {
      "character": "Tom",
      // Tom will fade to 0 opacity
      "opacity": 0,
      // I like to move characters off screen or fade them 0.5 second after the last talking command
      "startTime": 9.9
    },
    {
      "character": "Maria",
      // Maria will slide back off the screen to the left
      "position": { "x": -25, "y": 0, "z": 1 },
      // The animation will stop playing 0.5 seconds after the 'finishTime' of the last command - or 0.5 seconds after 'startTime' if 'finishTime' isn't there.
      "startTime": 10.4
    }
  ]
}
```
````

> [!NOTE]
>
> 1. In the above sections, examples of `lang` are:
>
> - `html` - HTML/CSS
> - `js` - JavaScript
> - `jsx` - JSX

## Numbering Challenges

Every challenge needs an `id`. If you don't specify one, then MongoDB will create a new random one when it saves the data; however, we don't want it to do that, since we want the challenge ids to be consistent across different environments (staging, production, lots of different developers, etc.).

To generate a new one in a shell (assuming MongoDB is running separately):

1. Run `mongo` command.
2. Run `ObjectId()` command.

For example:

```bash
$ mongo
MongoDB shell version v3.6.1
connecting to: mongodb://127.0.0.1:27017
MongoDB server version: 3.4.10
...
$ ObjectId()
ObjectId("5a474d78df58bafeb3535d34")
```

The result is a new id, for example, `5a474d78df58bafeb3535d34` above.

Once you have your id, put it into the markdown file as the `id` field at the top, e.g.

```yml
---
id: 5a474d78df58bafeb3535d34
title: Challenge Title
```

## Naming challenges

Naming things is hard. We've made it easier by imposing some constraints.

All challenge titles should be explicit and should follow this pattern:

[verb][object clause]

Here are some example challenge names:

- Use Clockwise Notation to Specify the Padding of an Element
- Condense arrays with .reduce
- Use Bracket Notation to Find the First Character in a String

## Challenge descriptions/instructions

Sentences should be clear and concise with minimal jargon. If used, jargon should be immediately defined in plain English.

Keep paragraphs short (around 1-4 sentences). People are more likely to read several short paragraphs than a wall of text.

Use American English, e.g., use `labeled` instead of `labelled`.

Challenge text should use the second person ("you") to help to give it a conversational tone. This way the text and instructions seem to speak directly to the camper working through the challenge. Try to avoid using the first person ("I", "we", "let's", and "us").

Don't use outbound links. These interrupt the flow. Campers should never have to google anything during these challenges. If there are resources you think campers would benefit from, add them to the challenge's Guide-related article.

You can add diagrams if necessary.

Don't use emojis or emoticons in challenges. freeCodeCamp has a global community, and the cultural meaning of an emoji or emoticon may be different around the world. Also, emojis can render differently on different systems.

Proper nouns should use correct capitalization when possible. Below is a list of words as they should appear in the challenges.

- JavaScript (capital letters in "J" and "S" and no abbreviations)
- Node.js
- Although sometimes inaccurate, non-hyphenated forms of 'back end' and 'front end' should be used, as they are more widely used.

### The 2-minute rule

Each challenge should be solvable within 120 seconds by a native English speaker who has completed the challenges leading up to it. This includes the amount of time it takes to read the directions/instructions, understand the seeded code, write their code and get all the tests to pass.

If it takes longer than two minutes to complete the challenge, you have two options:

- Simplify the challenge, or
- Split the challenge into two challenges.

The 2-minute rule forces you, the challenge designer, to make your directions concise, your seed code clear, and your tests straightforward.

We track how long it takes for campers to solve challenges and use this information to identify challenges that need to be simplified or split.

### Modularity

Each challenge should teach exactly one concept, and that concept should be apparent from the challenge's name.

We can reinforce previously covered concepts through repetition and variations - for example, introducing h1 elements in one challenge, then h3 elements a few challenges later.

Our goal is to have thousands of 2-minute challenges. These can flow together and reiterate previously-covered concepts.

### Formatting challenge text

Here are specific formatting guidelines for challenge text and examples:

- Language keywords go in `\`` backticks. For example, HTML tag names or CSS property names.
- References to code parts (i.e. function, method, or variable names) should be wrapped in `\`` backticks. See example below:

```md
Use `parseInt` to convert the variable `realNumber` into an integer.
```

- References to file names and path directories (e.g. `package.json`, `src/components`) should be wrapped in `\`` backticks.
- Multi-line code blocks **must be preceded by an empty line**. The next line must start with three backticks followed immediately by one of the [supported languages](https://prismjs.com/#supported-languages). To complete the code block, you must start a new line that only has three backticks and **another empty line**. See example below:
- Whitespace matters in Markdown, so we recommend that you make it visible in your editor.

**Note:** If you are going to use an example code in YAML, use `yaml` instead of `yml` for the language to the right of the backticks.

The following is an example of code:

````md
```{language}

[YOUR CODE HERE]

```
````

- Additional information in the form of a note should be surrounded by blank lines, and formatted: `**Note:** Rest of note text...`
- If multiple notes are needed, then list all of the notes in separate sentences using the format: `**Notes:** First note text. Second note text.`
- Use single quotes where applicable

**Note:** The equivalent _Markdown_ should be used in place of _HTML_ tags.

## Writing tests

Challenges should have the minimum number of tests necessary to verify that a camper understands a concept.

Our goal is to communicate the single point that the challenge is trying to teach, and test that they have understood that point.

Challenge tests can make use of the Node.js and Chai.js assertion libraries. Also, if needed, user-generated code can be accessed in the `code` variable. In addition, the `__helpers` object exposes several functions that simplify the process of writing tests. The available functions are defined in the [curriculum-helpers](https://github.com/freeCodeCamp/curriculum-helpers/blob/main/lib/index.ts) repo.

## Formatting Seed Code

Here are specific formatting guidelines for the challenge seed code:

- Use two spaces to indent
- JavaScript statements end with a semicolon
- Use double quotes where applicable

### Seed Code Comments

We have a [comment dictionary](https://github.com/freeCodeCamp/freeCodeCamp/blob/main/curriculum/dictionaries/english/comments.json) that contains the only comments that can be used within the seed code. The exact case and spacing of the dictionary comment must be used. The comment dictionary should not be expanded without prior discussion with the dev-team.

Comments used should have a space between the comment characters and the comment themselves. In general, comments should be used sparingly. Always consider rewriting a challenge's description or instructions if it could avoid using a seed code comment.

Example of a valid single-line JavaScript comment:

```js
// Only change code below this line
```

Example of a valid CSS comment:

```css
/* Only change code above this line */
```

If a challenge only has a single place where code changes are needed, please use the comments in the following example to instruct the user where changes should be made.

```js
var a = 3;
var b = 17;
var c = 12;

// Only change code below this line
a = a + 12;
b = 9 + b;
c = c + 7;
```

If a challenge has multiple places where the user is expected to change code (i.e. the React challenges)

```jsx
class MyComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      text: 'Hello'
    };
    // Change code below this line

    // Change code above this line
  }
  handleClick() {
    this.setState({
      text: 'You clicked!'
    });
  }
  render() {
    return (
      <div>
        {/* Change code below this line */}
        <button>Click Me</button>
        {/* Change code above this line */}
        <h1>{this.state.text}</h1>
      </div>
    );
  }
}
```

### Translation of Seed Code Comments

There are separate comment dictionaries for each language. The [English version of the comment dictionary](https://github.com/freeCodeCamp/freeCodeCamp/blob/main/curriculum/dictionaries/english/comments.json) is the basis for the translations found in the corresponding non-English versions of the files. The non-English version of the Chinese comment dictionary would be located at `/curriculum/dictionaries/chinese/comments.json`. Each dictionary consists of an array of objects with a unique `id` property and a `text` property. Only the `text` should be modified to encompass the translation of the corresponding English comment.

Some comments may contain a word/phrase that should not be translated. For example, variable names or proper library names like "React" should not be translated. See the comment below as an example. The word `myGlobal` should not be translated.

```text
Declare the myGlobal variable below this line
```

> [!NOTE]
>
> We are working on an integration to make it possible to work on i18n for the comment dictionary.

## Hints and Solutions

Each challenge has a `Get a Hint` button, so a user can access any hints/solutions which have been created for the challenge. Curriculum hints/solutions topics are located on [our forum](https://forum.freecodecamp.org/c/guide) under the `Guide` category.

If you find a problem with an existing challenge's hints/solutions topic, you can make suggestions in the [contributors category](https://forum.freecodecamp.org/c/contributors) on the forum. Moderators and users with trust level 3 will review the comments and decide whether or not to include the changes in the corresponding hint/solutions topic.

### Adding new Challenge hints/solutions Topics

Take the following steps when adding a new challenge hints/solutions-related topic.

1. Start by following the same steps for creating a new topic but review the next for creating the title.
2. The title of the topic should start with `freeCodeCamp Challenge Guide: ` concatenated with the actual title of the curriculum challenge. For example, if the challenge is named "`Chunky Monkey`", the topic title would be "`freeCodeCamp Challenge Guide: Chunky Monkey`".
3. `camperbot` should be the owner of these topics/posts, so you will need to request an admin to change the ownership of the main post to `camperbot`.
4. Once the new topic is created, a forum topic id is created. It is located at the end of the forum topic URL. This id must be added to the frontmatter of the curriculum challenge file via the normal pull request process for the `Get a Hint` button to link to the topic.

### Guidelines for Content of Hints and Solutions Topics

When proposing a solution for a curriculum challenge-related Guide topic, the full code must be added. This includes all the original seed code plus any changes needed to pass all the challenge tests. The following template should be used when creating new hints/solutions topics:

````md
# Challenge Name Goes Here

---

## Problem Explanation

This summarizes what needs to be done without just restating the challenge description and/or instructions. This is an optional section

#### Relevant Links

- [Link Text](link_url_goes_here)
- [Link Text](link_url_goes_here)

---

## Hints

### Hint 1

Hint goes here

### Hint 2

Hint goes here

---

## Solutions

<details><summary>Solution 1 (Click to Show/Hide)</summary>

```js
function myFunc() {
  console.log('Hello World!');
}
```

#### Code Explanation

- Code explanation goes here
- Code explanation goes here

#### Relevant Links

- [Link Text](link_url_goes_here)
- [Link Text](link_url_goes_here)

</details>
````

## Testing Challenges

Before you [create a pull request](how-to-open-a-pull-request.md) for your changes, you need to validate that the changes you have made do not inadvertently cause problems with the challenge.

1. To test all challenges run the below command from the root directory

```
pnpm run test:curriculum
```

2. To test single challenge, you can use it challenge id with following command

```
FCC_CHALLENGE_ID=646cf6cbca98e258da65c979 pnpm run test:curriculum
```

3. You can also test a block or a superblock of challenges with these commands

```
FCC_BLOCK='Basic HTML and HTML5' pnpm run test:curriculum
```

```
FCC_SUPERBLOCK='responsive-web-design' pnpm run test:curriculum
```

You are also able to test challenges by title by performing the following steps:

1. Switch to the `curriculum` directory:

   ```
   cd curriculum
   ```

2. Run the following for each challenge file for which you have changed (replacing `challenge-title-goes-here` with the full title of the challenge):

   ```
   pnpm run test -- -g challenge-title-goes-here
   ```

> [!TIP]
> You can set the environment variable `LOCALE` in the `.env` to the language of the challenge(s) you need to test.
>
> The currently accepted values are `english` and `chinese`, with `english` being set by default.

## Proposing a Pull Request (PR)

After you've committed your changes, check here for [how to open a Pull Request](how-to-open-a-pull-request.md).

## Useful Links

Creating and Editing Challenges:

1. [Challenge types](https://github.com/freeCodeCamp/freeCodeCamp/blob/main/client/utils/challenge-types.js#L1-L13) - what the numeric challenge type values mean (enum).

2. [Contributing to FreeCodeCamp - Writing ES6 Challenge Tests](https://www.youtube.com/watch?v=iOdD84OSfAE#t=2h49m55s) - a video following [Ethan Arrowood](https://twitter.com/ArrowoodTech) as he contributes to the old version of the curriculum.

## Helper Scripts

> [!NOTE]
> If you are working with the step-based challenges, refer to the [Work on Practice Projects](how-to-work-on-practice-projects.md) section.

There are a few helper scripts that can be used to manage the challenges in a block. Note that these commands should all be run in the block directory. For example:

```bash
cd curriculum/challenges/english/02-javascript-algorithms-and-data-structures/basic-algorithm-scripting
```

### Add New Challenge

To add a new challenge at the end of a block, call the script:

```bash
pnpm run create-next-challenge
```

This will prompt you for the challenge information and create the challenge file, updating the `meta.json` file with the new challenge information.

### Delete a Challenge

To delete a challenge, call the script:

```bash
pnpm run delete-challenge
```

This will prompt you to select which challenge should be deleted, then delete the file and update the `meta.json` file to remove the challenge from the order.

### Insert a Challenge

To insert a challenge before an existing challenge, call the script:

```bash
pnpm run insert-challenge
```

This will prompt you for the challenge information, then for the challenge to insert before. For example, if your choices are:

```bash
a
b
c
```

If you choose `b`, your new order will be:

```bash
a
new challenge
b
c
```

### Update Challenge Order

If you need to manually re-order the challenges, call the script:

```bash
pnpm run update-challenge-order
```

This will take you through an interactive process to select the order of the challenges.

## Troubleshooting

### Infinite Loop Detected

If you see the following error in the console while previewing a challenge:

```text
Potential infinite loop detected on line <number>...
```

This means that the loop-protect plugin has found a long-running loop or recursive function. If your challenge needs to do that (e.g. it contains an event loop that is supposed to run indefinitely), then you can prevent the plugin from being used in the preview. To do so, add `disableLoopProtectPreview: true` to the block's `meta.json` file.

If your tests are computationally intensive, then you may see this error when they run. If this happens then you can add `disableLoopProtectTests: true` to the block's `meta.json` file.

It's not typically necessary to have both set to true, so only set them as needed.
