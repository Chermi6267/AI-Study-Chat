// const readline = require("readline");
// const getAccessToken = require("./getAccessToken").getAccessToken;
// const askAI = require("./askAI").askAI;

// process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0"; // Disable SSL Certificate verification

// let accessToken = null;
// let messages = [];

// const rl = readline.createInterface({
//   input: process.stdin,
//   output: process.stdout,
// });

// async function processInput(input) {
//   try {
//     if (!accessToken) {
//       accessToken = await getAccessToken(
//         "NDMwOGVlYWUtMTA1NC00NTMzLTg0MjYtNWE5YzE1YjJlMTM4OmYzMjhhYTJhLTgwYTMtNDBmOC1hMjk0LWZjYWVmNjVmMzc3ZQ=="
//       );
//       console.log(accessToken);
//     }
//     messages.push({ role: "user", content: input });
//     const result = await askAI(accessToken["access_token"], messages, 1000);
//     messages.push(result["choices"][0]["message"]);
//     console.log(messages);
//     console.log(result["choices"][0]["message"]);
//   } catch (error) {
//     if (error.response && error.response.status === 401) {
//       accessToken = await getAccessToken(
//         "NDMwOGVlYWUtMTA1NC00NTMzLTg0MjYtNWE5YzE1YjJlMTM4OmYzMjhhYTJhLTgwYTMtNDBmOC1hMjk0LWZjYWVmNjVmMzc3ZQ=="
//       );
//       const updatedResult = await askAI(
//         accessToken["access_token"],
//         messages,
//         1000
//       );
//       messages.push(updatedResult["choices"][0]["message"]);
//       console.log(messages);
//       console.log(updatedResult["choices"][0]["message"]);
//     } else {
//       console.error("Error:", error);
//     }
//   }
// }

// function askQuestion() {
//   rl.question("Введите ваш вопрос: ", async (input) => {
//     await processInput(input);
//     askQuestion();
//   });
// }

// // askQuestion();
// const Tesseract = require("tesseract.js");
// // Путь к вашему изображению
// const imagePath = "../converted.jpg";

// // Функция для распознавания текста
// async function recognizeText(imagePath) {
//   try {
//     const {
//       data: { text },
//     } = await Tesseract.recognize(imagePath, "rus+eng");

//     return text;
//   } catch (error) {
//     console.error(error);
//   }
// }

// // Вызов функции распознавания текста
// recognizeText(imagePath).then((res) => {
//   console.log(res);
// });
// const Jimp = require("jimp");

// Функция для конвертации изображения в черно-белое
// async function convertToBlackAndWhite(inputPath, outputPath) {
//   try {
//     const image = await Jimp.read(inputPath);

//     // Преобразование в оттенки серого
//     image.grayscale();

//     // Инвертирование цветов
//     image.invert();

//     // Сохранение результата
//     await image.writeAsync(outputPath);
//     console.log(`Изображение сохранено по адресу: ${outputPath}`);
//   } catch (error) {
//     console.error("Ошибка при обработке изображения:", error);
//   }
// }

// // Использование функции
// const inputPath = "../t1.jpg";
// const outputPath = "../converted.jpg"; // замените на путь для сохранения черно-белого изображения
// convertToBlackAndWhite(inputPath, outputPath);

// ===================================================
const Jimp = require("jimp");
const sharp = require("sharp");
const Tesseract = require("tesseract.js");

async function preprocessImage(inputPath) {
  try {
    const image = await Jimp.read(inputPath);

    // Преобразование в оттенки серого
    image.grayscale();

    // Увеличение контраста
    image.contrast(1);

    // Инвертирование цветов
    image.invert();

    // Конвертация изображения в буфер
    const buffer = await image.getBufferAsync(Jimp.MIME_JPEG);
    return buffer;
  } catch (error) {
    console.error("Ошибка при обработке изображения:", error);
  }
}

async function enhanceAndRecognize(inputPath) {
  const buffer = await preprocessImage(inputPath);

  if (!buffer) {
    console.error("Не удалось получить буфер изображения");
    return;
  }

  // Дополнительная обработка с помощью sharp
  const processedBuffer = await sharp(buffer)
    .threshold(128) // бинаризация изображения
    .toBuffer()
    .catch((err) => {
      console.error("Ошибка при дополнительной обработке:", err);
      return null;
    });

  if (!processedBuffer) {
    console.error("Не удалось получить обработанный буфер изображения");
    return;
  }

  // Распознавание текста с помощью tesseract.js на русском и английском языках
  Tesseract.recognize(processedBuffer, "rus+eng")
    .then(({ data: { text } }) => {
      console.log("Распознанный текст:", text);
    })
    .catch((err) => console.error("Ошибка при распознавании текста:", err));
}

// Пути к файлам
const inputPath = "../t1.jpg"; // замените на путь для сохранения черно-белого изображения

// Вызов функции
enhanceAndRecognize(inputPath);

// ===================================================

// const { ocrSpace } = require("ocr-space-api-wrapper");

// async function main() {
//   try {
//     // Using the OCR.space default free API key (max 10reqs in 10mins) + remote file
//     // const res1 = await ocrSpace("http://dl.a9t9.com/ocrbenchmark/eng.png");

//     // Using your personal API key + local file
//     const res2 = await ocrSpace("../t1.jpg", {
//       apiKey: `<>`,
//       language: "rus",
//     });
//     return res2["ParsedResults"][0]["ParsedText"];
//     // Using your personal API key + base64 image + custom language
//     // const res3 = await ocrSpace("data:image/png;base64...", {
//     //   apiKey: "<API_KEY_HERE>",
//     //   language: "rus",
//     // });
//   } catch (error) {
//     console.error(error);
//   }
// }

// main().then((res) => {
//   console.log(res);
// });

// var b = {
//   ParsedResults: [
//     {
//       TextOverlay: [Object],
//       TextOrientation: "0",
//       FileParseExitCode: 1,
//       ParsedText:
//         "Экзаменационная работа Для 10 Ю1асса По итогам 2023-2024 года.\r\n" +
//         "Вариант 2,\r\n" +
//         "М 1. Задание 5, Формат ЕГЭ. В одном из приведенных ниже предложений НЕВЕРНО употреблено\r\n" +
//         "выделенное слово, Исправьте ошибку, подобран к выделенному слову пароним, Запишите\r\n" +
//         "подобранное слово,\r\n" +
//         "В одном из приведённых ниже предложений НЕВЕРНО употреблено выделенное слово. Исправьте\r\n" +
//         "лексическую ошибку. подобрав к выделенному слову пароним. Запишите подобраннос слово,\r\n" +
//         "Вратарь хоккейной команды ОДЕВАЕТ экипировку , зашитающую его ударов шайбы.\r\n" +
//         "Все автоматы, оформляющие АБОНЕМЕНТЫ для пассажиров электричек, расположены напротив касс.\r\n" +
//         "Если голое у исполнителя негромкий, а музыкшп,ное сопровождение ЗВУЧНОЕ, артисту приходится\r\n" +
//         "нно напрягать связки.\r\n" +
//         "Удив тельно СЦЕНИЧНЫЙ в каждом жесте и звуке, он, кажется, с пеленок стал профессиональным актёРOМ“\r\n" +
//         "Ne2„\r\n" +
//         "е 6. Формат ЕГЭ. Отредактируйте предложение: исправьте лексическую ошибку, з:ваенив неверно\r\n" +
//         "нное слово. Затишите подобранное слово, соблюдая нормы современного русского литературного\r\n" +
//         "языка,\r\n" +
//         "Одержать первенство на соревнованиях нашим спортсменам помогли ежедневные тренировки.\r\n" +
//         "МЗ. Задание 8. Формат ЕГЭ, Установите соответствие между грамматическими ошибками и предложениями,\r\n" +
//         "в которых они допущены: к каждой позиции первого столбца подберите соответствующую позицию из\r\n" +
//         "вто го столбца.\r\n" +
//         "П ожения\r\n" +
//         "атические ошибки\r\n" +
//         "А) нарушение в построении предложения 1) Шевцов уже давно опык от полезного питания, поэтому в\r\n" +
//         "санатории первое время ничего не мог ни есть ни пить“,\r\n" +
//         "с причастным оборотом\r\n" +
//         "видо-временной особенно поражш.то его то, что к каждому завтраку неизменно\r\n" +
//         "Б)\r\n" +
//         "нарушение\r\n" +
//         "есенности глагольных форм\r\n" +
//         "подавался какао.\r\n" +
//         "В) н ушение в построении предложения 2) В журна.ле «Этнографическом обозрении» Д. Н. Ушаков\r\n" +
//         "опубликовал статьи о поверьях русских крестьян.\r\n" +
//         "с н гласованным приложением\r\n" +
//         "ение связи между подлежащим и 3) И. С. Тургенев писал, что «берегите язык, этот клад, это\r\n" +
//         "достояние» ,\r\n" +
//         "Д) авильное по строение предложе ния 4 ) В 1870-е годы Л Н . Толстой по •друтому взгляну л на своё\r\n" +
//         "предшествующее творчество и говорит, что «Война и мир»\r\n" +
//         "с косвенной чью\r\n" +
//         "в\r\n" +
//         "Б\r\n" +
//         "кажется ему «слишком многоречивым романом».\r\n" +
//         "5) Одним из самостоятельных видов искусства, сушествуюший с\r\n" +
//         "конца ХУ века, является ика.\r\n" +
//         "N24. Задание 9. Формат ЕГЭ. Укажите варианты ответов, в которых во всех словах одного ряда пропущена\r\n" +
//         "одна и та же буква. Запишите номера ответов,\r\n" +
//         "! ) раекрк>снегься. ктричневый, коснуться —\r\n" +
//         "“ 2) утапение, метеорология, претензия\r\n" +
//         "З) предлгя•ать, далёкий, объмлённый\r\n" +
//         "4) 1',рдиться, симв2л, разгараться\r\n" +
//         "5) 3 грев, герминология, сля,рение\r\n" +
//         "ЕГЭ. Укажите варианты ответов, в которых во всех словах одного ряда пропущена\r\n" +
//         "е 10. Формат\r\n" +
//         "N25.\r\n" +
//         "одна та же буква. Запишите номера ответов.\r\n" +
//         ") [фјџмурский, прутытие, тт•репить\r\n" +
//         "ниъпослать —\r\n" +
//         "дить, п\r\n" +
//         "4) фуситы Т\r\n" +
//         "5) ппиграть нърисовал, неотъемлемый —\r\n" +
//         "(Мб. Задание 1 . Формат ЕГЭ, Укажите варианты ответов, в которых во всех словах одного ряда пропущена\r\n" +
//         "одна и та буква. Запишите номера ответов.\r\n" +
//         "1) талант,оый. пугов«ца -е\r\n" +
//         "2) оТД„Чть, звонохск\r\n" +
//         "З) н ахваясь, завладивать —\r\n",
//       ErrorMessage: "",
//       ErrorDetails: "",
//     },
//   ],
//   OCRExitCode: 1,
//   IsErroredOnProcessing: false,
//   ProcessingTimeInMilliseconds: "1328",
//   SearchablePDFURL: "Searchable PDF not generated as it was not requested.",
// };

// console.log(b["ParsedResults"][0]["ParsedText"]);

var b = [
  { role: "user", content: "NEW" },
  { role: "assistant", content: "NEW" },
  {
    role: "user",
    content:
      "7 Complete the compound adjectives with the missingpart.\r\n" +
      "2\r\n" +
      "З\r\n" +
      "4\r\n" +
      "5\r\n" +
      "6\r\n" +
      "7\r\n" +
      "8\r\n" +
      "9\r\n" +
      "10\r\n" +
      "11\r\n" +
      "Му parents are really fashioned. They want to meet\r\n" +
      "every girl mention.\r\n" +
      "0ur neighbours have got really -behaved children.\r\n" +
      "They are so rude.\r\n" +
      "1s this саг new? ()r did уои buy it\r\n" +
      "-hand?\r\n" +
      "Angela's а\r\n" +
      "-working етр1оуее. She should get а better\r\n" +
      "Coldplay is -famous. Реор1е in every countryknow\r\n" +
      "the band.\r\n" +
      "Нег parents are quite -going. They don'tworry about\r\n" +
      "what she does.\r\n" +
      "1 don't work -time. onlydo four hours а day.\r\n" +
      "David Beckham is а good- тап.\r\n" +
      "First- children are тоге responsible than their\r\n" +
      "younger brothers and sisters.\r\n" +
      "Му sister's bought те а brand- camera. lt's much\r\n" +
      "better than ту old опе.\r\n" +
      "R011s-Royce cars are not built by robots. They are still\r\n" +
      "hand-\r\n" +
      "point for each correct answer\r\n" +
      "10\r\n" +
      "\n",
  },
  {
    role: "assistant",
    content:
      "1. Our parents are really fashioned. They want to meet every girl mentioned.\n" +
      "2. Our neighbours have got really well-behaved children.\n" +
      "3. Is this bag new? Or did you buy it second-hand?\n" +
      "4. Angela's a hard-working etrepreneur. She should get a better laptop.\n" +
      "5. Coldplay is very famous. People in every country know the band.\n" +
      "6. Neg parents are quite laid-back. They don't worry about what she does.\n" +
      "7. I don't work full-time. I only do four hours a day.\n" +
      "8. David Beckham is a good-looking man.\n" +
      "9. First-born children are often more responsible than their younger brothers and sisters.\n" +
      "10. My sister's bought me a brand-new camera. It's much better than my old one.\n" +
      "11. Rolls-Royce cars are not built by robots. They are still hand-built.",
  },
  { role: "user", content: "Придумай похожие задания" },
  {
    role: "assistant",
    content:
      "1. Напиши рассказ о том, как ты провёл лето.\n" +
      "\n" +
      "2. Придумай сказку о том, как котёнок нашёл новых друзей.\n" +
      "\n" +
      "3. Напиши стихотворение о том, как ты провёл выходные.\n" +
      "\n" +
      "4. Придумай историю о том, как ты спас кота, который застрял на дереве.\n" +
      "\n" +
      "5. Напиши рассказ о том, как ты провёл день в парке.",
  },
  { role: "user", content: "asdfasdf" },
  {
    role: "assistant",
    content:
      "Извините, но я не понимаю, что вы хотите. Могу ли я помочь вам с чем-то ещё?",
  },
  { role: "user", content: "adsf" },
];

b.unshift({
  role: "system",
  content:
    "Ты бот созданный помогать людям в решении задач, твоя задача давать точные и веселые ответы. Ты работаешь с прерывистыми, неполными предложения и заданиями, так что тебе нужно дополнять задания и решать их",
});

console.log(b);

<div
  class="user-menu-wrapper"
  style="transform: translate(-50%, -400%);"
></div>;
