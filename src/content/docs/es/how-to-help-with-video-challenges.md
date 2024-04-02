---
title: How to Help with Video Challenges
---

Los retos en vídeo son un nuevo tipo de desafío en el currículo de freeCodeCamp.

Un desafío de vídeo es una pequeña sección de un curso de vídeo completo sobre un tema en particular. Una página de desafío de vídeo inserta un vídeo de YouTube. Cada página de desafío tiene una única pregunta de selección múltiple relacionada con el vídeo. El usuario deberá responder correctamente la pregunta antes de avanzar al siguiente desafío de video en el curso.

Las páginas de desafío de vídeo son creadas por miembros del equipo de freeCodeCamp. Los vídeos de YouTube también son subidos por miembros del equipo de freeCodeCamp. Muchos de los desafíos de video todavía no tienen preguntas asociadas a ellos.

Puedes ayudar creando preguntas de selección múltiple relacionadas con las secciones de video y agregando las preguntas a los archivos markdown para los desafíos de video.

## Plantilla de desafío

A continuación se muestra una plantilla de cómo se ven los archivos markdown de los desafíos.

```md
---
id: Identificador único (alfanumérico, MongoDB_id)
title: Título del desafío
challengeType: 11
videoId: 'Id del video de YouTube del video desafío'
forumTopicId: 12345
---

# --descripción--

Texto de descripción del desafío, en markdown

`` `html

<div>código de ejemplo</div>
```

# --question--

Estos campos se utilizan actualmente para los desafíos de Python de opción múltiple.

## --text--

El texto de la pregunta va aquí.

## --answers--

Respuesta 1

---

Respuesta 2

---

Más respuestas

## --video-solution--

El número para la respuesta correcta va aquí.

```

## Creating Questions for Video Challenges

### Access the Video Challenge Markdown Files

You can find the markdown files for video challenges at the following locations in the curriculum:

- [Data Analysis with Python Course](https://github.com/freeCodeCamp/freeCodeCamp/tree/main/curriculum/challenges/english/08-data-analysis-with-python/data-analysis-with-python-course)
- [TensorFlow 2.0 Course](https://github.com/freeCodeCamp/freeCodeCamp/tree/main/curriculum/challenges/english/11-machine-learning-with-python/tensorflow)
- [Numpy Course](https://github.com/freeCodeCamp/freeCodeCamp/tree/main/curriculum/challenges/english/08-data-analysis-with-python/numpy)
- [How Neural Networks Work Course](https://github.com/freeCodeCamp/freeCodeCamp/tree/main/curriculum/challenges/english/11-machine-learning-with-python/how-neural-networks-work)

Pick a challenge markdown file from the options above.

### Skim through the video associated with the challenge and create a multiple-choice question

First, find the `videoId`.

For example, in the following code from the header of a video challenge markdown file, the `videoId` is "nVAaxZ34khk". En GitHub, la información debe ser colocada en un formato de tabla.

```

---

id: 5e9a093a74c4063ca6f7c14d
title: Data Analysis Example A challengeType: 11
videoId: nVAaxZ34khk

---

````

A continuación, accede al vídeo de YouTube con esa `videoId`. The URL for the video will be:
https://www.youtube.com/watch?v=[videoId] (replace `videoId` in the URL with the video's ID - without square brackets)

In the example above, the URL is https://www.youtube.com/watch?v=nVAaxZ34khk

Skim the YouTube video with that `videoId` and think of a multiple-choice question based on the content of the video.

### Add the Question to the Markdown File

You can add the question locally or using the GitHub interface. Para añadir la pregunta localmente, necesitas [configurar freeCodeCamp localmente](how-to-setup-freecodecamp-locally). También puede encontrar el archivo en GitHub y hacer clic en el botón Editar para añadir la pregunta directamente en su navegador.

Si aún no se ha agregado una pregunta a un desafío de video en particular, tendrá la siguiente pregunta predeterminada:

```md
# --question--

## --text--

Question text

## --answers--

Answer 1

---

Answer 2

---

More answers

## --video-solution--

1
````

Agrega/Actualiza el texto de la pregunta debajo de la parte que dice:

```
# --question--

## --text--
```

Añade/Actualiza las respuestas (`Answer 1`, `Answer 2`, y así) debajo de `## --answers--`. Asegúrate de actualizar el número debajo de `## --video-solution--` con el número de respuesta correcto. Puede añadir más respuestas posibles usando el mismo formato. The questions and answers can be surrounded with quotation marks.

### Ejemplos de preguntas

````md
# --pregunta--

## --texto--

Qué muestra este código JavaScript en la consola?

```js
console.log('hello world');
```
````

## --answers--

hola _mundo_

---

**hola** mundo

---

hola mundo

---

## --video-solution--

3

`````

````md
# --pregunta--

## --texto--

¿Qué se imprimirá después de ejecutar este código?:

```py
width = 15
height = 12.0
print(height/3)
`````

## --answers--

39

---

4

---

4.0

---

5.0

---

5

## --video-solution--

3 ````

Para más ejemplos, puede ver los archivos de markdown para el siguiente curso de video. Todos los desafíos ya tienen preguntas: [Curso de Python para todos](https://github.com/freeCodeCamp/freeCodeCamp/tree/main/curriculum/challenges/english/07-scientific-computing-with-python/python-for-everybody)

## Open a Pull Request

Después de crear una o más preguntas, puedes enviar los cambios a una nueva rama y [abrir una pull request](how-to-open-a-pull-request).
