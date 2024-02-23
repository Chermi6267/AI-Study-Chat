import React, { useRef, useEffect } from 'react'
import MessageHandler from './MessageHandler';


export default function Messages() {
    const chatData = [
        {
            id: 0,
            type: 'bot',
            text: 'Напиши мне код для нахождения n-ого числа фибоначи на Python JS C# C++',
            timestamp: '2024-01-07T13:15:00',
        },
        {
            id: 1,
            type: 'user',
            text: 'Напиши мне код для нахождения n-ого числа фибоначи на Python JS C# C++',
            timestamp: '2024-01-07T13:15:00',
        },
        {
            id: 2,
            type: 'bot',
            text: 'Конечно, вот примеры кода на Python, JavaScript, C#, C++ для нахождения n-ого числа Фибоначчи:\n\nPython\n\n```python\ndef fibonacci(n, start=0, end=1):\n    if n == 0:\nreturn start\n    elif n == 1:\n        return end\n    else:\n        return fibonacci(n-1, end, end+start)\n\nprint(fibonacci(10))\n\n``\n\n```JavaScript\n\n```javascript\nfunction fibonacci(n, a = 0, b = 1) {\n  if (n === 0) {\n    return a;\n  } else if (n === 1) {\n    return b;\n  } else {\n    return fibonacci(n-1, b, a + b);\n  }\n}\n\nconsole.log(fibonacci(10));\n\n``\n\n```C#\n\n```csharp\nusing System;\n\npublic static int Fibonacci(int n)\n{\n    int a = 0;\n    int b = 1;\n    int result = 0;\n\n    if (n == 0)\n    {\n        return a;\n    }\n    else if (n == 1)\n    {\nreturn b;\n    }\n    else\n    {\n        result = a + b;\n        return Fibonacci(n - 1, result, a + b);\n    }\n}\n\nConsole.WriteLine(Fibonacci(10));\n\n``\n\n```C++\n\n```cpp\n#include <iostream>\n\nint Fibonacci(int n) {\n    int a = 0;\n    int b = 1;\n    int result = 0;\n\n    if (n == 0) {\n        return a;\n    }\n    else if (n == 1) {\n        return b;\n    }\n    else {\n        result = a + b;\n        return Fibonacci(n - 1, result, a + b);\n    }\n}\n\nstd::cout << Fibonacci(10);\n\n```\n\nЭти функции принимают целое число n, которое указывает, какое число Фибоначчи нужно найти, и возвращают это число. Если n равно 0, функция возвращает a, если n равно 1, функция возвращает b. В противном случае, функция рекурсивно вызывает себя, используя результат предыдущего вызова, чтобы найти следующее число Фибоначчи.',
            timestamp: '2024-01-07T13:16:30',
        },
        {
            id: 3,
            type: 'user',
            text: 'Напиши мне код бинарного поиска на C++, Python, JS, C#, Rust и ruby',
            timestamp: '2024-01-07T13:15:00',
        },
        {
            id: 21,
            type: 'bot',
            text: 'Конечно, вот примеры функций бинарного поиска на указанных языках:\n\n* C++:\n```cpp\nint binarySearch(int arr[], int left, int right, int target) {\n    while (left <= right) {\nint mid = left + (right - left) / 2;\n        if (arr[mid] == target)\n            return mid;\n        else if (arr[mid] < target)\n            left = mid + 1;\n        else\n            right = mid - 1;\n    }\n    return -1;\n}\n\n```\n\n* Python:\n```python\ndef binary_search(arr, left, right, target):\n    while left <= right:\n        mid = (left + right) // 2\n        if arr[mid] == target:\n            return mid\n        elif arr[mid] < target:\n            left = mid + 1\n        else:\n            right = mid - 1\n    return -1\n\n```\n\n* JavaScript:\n```javascript\nfunction binarySearch(arr, left, right, target) {\n    while (left <= right) {\n        let mid = Math.floor((left + right) / 2);\n        if (arr[mid] === target) {\n            return mid;\n        } else if (arr[mid] < target) {\n            left = mid + 1;\n        } else {\n            right = mid - 1;\n        }\n    }\n    return -1;\n}\n\n```\n\n* C#:\n```csharp\npublic static int BinarySearch(int[] arr, int left, int right, int target) {\n    while (left <= right) {\n        int mid = (left + right) / 2;\n        if (arr[mid] == target)\n            return mid;\n        else if (arr[mid] < target)\n            left = mid + 1;\n        else\n            right = mid - 1;\n    }\n    return -1;\n}\n\n```\n\n* Rust:\n```rust\nfn binary_search(arr: &[int], left: usize, right: usize, target: int) -> usize {\n    while left <= right {\n        let mid = (left + right) / 2;\n        if arr[mid] == target {\n            return mid;\n        } else if arr[mid] < target {\n            left = mid + 1;\n  } else {\n            right = mid - 1;\n        }\n    }\n    return -1;\n}\n\n```\n\n* Ruby:\n```ruby\ndef binary_search(arr, left, right, target)\n  while left <= right {\n    mid = (left + right) / 2\n    if arr[mid] == target\n      return mid\n    elsif arr[mid] < target\n      left = mid + 1\n    else\n      right = mid - 1\n    end\n  }\n  return -1\nend\n\n```',
            timestamp: '2024-01-07T13:16:30',
        },
        {
            id: 6,
            type: 'user',
            text: 'Напиши мне код сортировки выбором на Python, C++, JS, Ruby',
            timestamp: '2024-01-07T13:15:00',
        },
        {
            id: 22,
            type: 'bot',
            text: '```python\n\n# Сортировка выбором\n\n\ndef selection_sort(arr):\n    n = len(arr)\n    for i in range(n):\n        min_idx = i\n        for j in range(i+1, n):\n            if arr[j] < arr[min_idx]:\n                min_idx = j\n        arr[i], arr[min_idx] = arr[min_idx], arr[i]\n    return arr\n\n\n# Тестирование функции\n\n\nprint("Отсортированный массив:")\nprint(selection_sort(arr = [9, 2, 5, 1, 7, 3, 6, 4]))\n\n```\n\n```c++\n\n#include <iostream>\n#include <vector>\n\n\nvoid selectionSort(std::vector<int>& arr);\n\n\nint main() {\n    std::vector<int> arr = {9, 2, 5, 1, 7, 3, 6, 4};\n    selectionSort(arr);\n    std::cout << "Отсортированный массив: ";\n    for (int i = 0; i < arr.size(); ++i) {\n        std::cout << arr[i] << " ";\n    }\n    return 0;\n}\n\n\nvoid selectionSort(std::vector<int>& arr) {\n    int n = arr.size();\n    for (int i = 0; i < n-1; ++i) {\n        int min_idx = i;\n        for (int j = i+1; j < n; ++j) {\n            if (arr[j] < arr[min_idx]) {\n                min_idx = j;\n            }\n        }\n        std::swap(arr[i], arr[min_idx]);\n    }\n}\n\n```\n\n```javascript\n\nfunction selectionSort(arr) {\n    let n = arr.length;\n for (let i = 0; i < n-1; i++) {\n        let min_idx = i;\n        for (let j = i+1; j < n; j++) {\n            if (arr[j] < arr[min_idx]) {\n                min_idx = j;\n            }\n        }\n        [arr[i], arr[min_idx]] = [arr[min_idx], arr[i]];\n    }\n    return arr;\n}\n\n\nconsole.log("Отсортированный массив:");\nconsole.log(selectionSort(arr = [9, 2, 5, 1, 7, 3, 6, 4]));\n\n```\n\n```ruby\n\ndef selection_sort(arr)\n  n = arr.length\n  for (i = 0; i < n-1; i++) {\n    min_idx = i\n    for (j = i+1; j < n; j++) {\n      if (arr[j] < arr[min_idx]) {\n        min_idx = j\n      }\n }\n    (arr[i], arr[min_idx]) = (arr[min_idx], arr[i])\n  }\n  return arr\nend\n\n\nputs "Отсортированный массив:"\nputs selection_sort(arr = [9, 2, 5, 1, 7, 3, 6, 4])\n\n```\n',
            timestamp: '2024-01-07T13:16:30',
        },
        {
            id: 8,
            type: 'user',
            text: 'Напиши мне код для нахождения n-ого числа фибоначи на Python JS C# C++',
            timestamp: '2024-01-07T13:15:00',
        },
        {
            id: 23,
            type: 'bot',
            text: "Для решения этой задачи нужно использовать циклы и условные операторы. Вот код на Python, который решает эту задачу:\n\n```python\nnumbers = []\n\nfor i in range(20):\n    number = 1223 + i * 2\n if max(number) == 7 and sum(list(map(int, str(number)))) == 14 and number % 2 == 0:\n        numbers.append(number)\n\nmax_number = max(numbers)\nmin_number = min(numbers)\n\nprint(len(numbers), end=' ')\nprint(max_number - min_number)\n\n```\n\nЭтот код создает пустой список `numbers`, затем в цикле проходит по всем числам в диапазоне от 1223 до 2222 и добавляет их в список, если они удовлетворяют условиям задачи. Затем находятся максимальное и минимальное числа в списке `numbers`. Наконец, выводятся количество чисел, удовлетворяющих условиям, и разность между максимальным и минимальным числами.",
            timestamp: '2024-01-07T13:16:30',
        },
        {
            id: 24,
            type: 'bot',
            text: 'Конечно! Вот пример функции на Python, которая принимает список чисел и сортирует его:\n```python\ndef sort_numbers(numbers):\n    return sorted(numbers)\n\n```\nА вот пример того, как вы можете вызвать эту функцию в коде на JavaScript, чтобы отсортировать массив:\n```javascript\nconst numbers = [5, 2, 8, 1, 9];\nconst sortedNumbers = sort_numbers(numbers);\nconsole.log(sortedNumbers);\n\n```\nОбратите внимание, что в JavaScript мы используем метод `sorted()` для сортировки массива, а не функцию `sort()`.',
            timestamp: '2024-01-07T13:16:30',
        },
        {
            id: 25,
            type: 'bot',
            text: 'Вот пример программы на C++, реализующей алгоритм поиска в ширину для графа:\n\n```cpp\n#include <iostream>\n#include <queue>\n#include <vector>\n\nusing namespace std;\n\n// Функция для поиска кратчайшего пути в графе\nvoid bfs(vector<vector<int>> &g, int s) {\n    priority_queue<pair<int, int>, vector<pair<int, int>>, greater<pair<int, int>>> pq;\n    bool visited[s + 1];\n    memset(visited, true, sizeof(visited));\n    visited[s] = false;\n    pq.push({0, s});\n\n    while (!pq.empty()) {\n        int curr_vertex = pq.top().second;\n        pq.pop();\n\n        if (curr_vertex == s) {\n            break;\n        }\n\n        for (int i = 0; i < g[curr_vertex].size(); i++) {\n            int neigbor_vertex = g[curr_vertex][i];\n\n            if (visited[neigbor_vertex]) {\n                continue;\n            }\n\n            visited[neigbor_vertex] = true;\n\n            int curr_distance = pq.top().first + 1;\n            if (curr_distance < g[neigbor_vertex].size()) {\n                pq.push({curr_distance, neigbor_vertex});\n            }\n        }\n    }\n}\n\nint main() {\n    int num_vertices;\n    cin >> num_vertices;\n\n    vector<vector<int>> g(num_vertices + 1);\n    for (int i = 0; i <= num_vertices; i++) {\n        g[i].resize(num_vertices + 1);\n    }\n\n    int num_edges;\n    cin >> num_edges;\n\n    for (int i = 0; i < num_edges; i++) {\n        int s, t;\n        cin >> s >> t;\n\n        g[s][t] = 1;\n        g[t][s] = 1;\n    }\n\n    int s;\n    cin >> s;\n\n    bfs(g, s);\n\n    cout << "Кратчайший путь от " << s << " до каждого vertex:" << endl;\n    for (int i = 0; i <= num_vertices; i++) {\n        if (g[s][i]) {\n            cout << "Связь от " << s << " до " << i << " существует." << endl;\n        } else {\n            cout << "Связь от " << s << " до " << i << " не существует." << endl;\n        }\n    }\n\n    return 0;\n}\n\n```\n\nА вот пример программы на Ruby, которая вызывает функцию поиска в ширину из предыдущей программы на C++:\n\n```ruby\nrequire \'file\'\n\ndef bfs(g, s)\n  pq = Queue.new\n  visited = [true]\n  pq.insert(0, s)\n\n  while !pq.empty?\n    vertex = pq.dequeue\n    visited[vertex] = false\n\n    if vertex == s\n      return visited\n    end\n\n    neighbors = g[vertex]\n    neighbors.each do |neighbor|\n      if visited[neighbor]\n        continue\n      end\n\n      visited[neighbor] = true\n      next_distance = bfs(g, neighbor)\n      if next_distance < visited[vertex]\n        visited[vertex] = next_distance\n      end\n    end\n  end\nend\n\ndef shortest_path(g, s)\n  visited = bfs(g, s)\n  result = []\n  visited.each do |vertex, distance|\n    result << vertex if distance == visited[vertex]\n  end\n  result.reverse\nend\n\nFile.read(\'g.txt\').each_line do |line|\n  line.chomp!\n  vertices = line.split(\',\')\n  g[vertices[0]] = vertices.map { |vertex| vertices[1] }\nend\n\ns = File.read(\'start.txt\').split(\',\').first.to_i\n\nresult = shortest_path(g, s)\n\nputs "Кратчайший путь от #{s} до каждого vertex:"\nresult.each { |vertex, distance| puts "#{vertex} -> #{distance}" }\n\n```\n\nНе забудьте сохранить файлы `g.txt` и `start.txt` с вашими данными графа и начальной вершины соответственно.',
            timestamp: '2024-01-07T13:16:30',
        },
        {
            id: 26,
            type: 'bot',
            text: '```java\npublic class Fraction {\n    private int numerator;\n    private int denominator;\n\n    public Fraction(int numerator, int denominator) {\n        this.numerator = numerator;\n        this.denominator = denominator;\n    }\n\n    public int getNumerator() {\n        return numerator;\n    }\n\n    public int getDenominator() {\n        return denominator;\n    }\n\n    public void addFraction(Fraction fraction) {\n        int gcd = getGCD(getDenominator(), fraction.getDenominator());\n        int numeratorSum = getNumerator() + fraction.getNumerator() * gcd / getDenominator();\n        int denominatorSum = gcd * (getDenominator() / gcd) + fraction.getDenominator() / gcd;\n        setNumerator(numeratorSum);\n        setDenominator(denominatorSum);\n    }\n\n    private int getGCD(int a, int b) {\n        if (b == 0) {\n            return a;\n        }\n        return getGCD(b, a % b);\n    }\n}\n```\n----',
            timestamp: '2024-01-07T13:16:30',
        },
        {
            id: 27,
            type: 'bot',
            text: 'Конечно, вот пример скрипта на Perl для обработки текстового файла и извлечения определенной информации:\n\n```perl\n#!/usr/bin/perl\n\nuse strict;\nuse warnings;\n\nmy $file = \'your_file.txt\';  # замените \'your_file.txt\' на путь к вашему файлу\n\nmy $search_term = \'your_search_term\';  # замените \'your_search_term\' на термин, который вы ищете\n\nmy $result;\n\nif (open MYFILE, $file or die "Не удалось открыть файл: $!) {\n    close MYFILE;\n    return;\n}\n\nwhile (read MYFILE, $result, 4096) {\n    if (/$search_term/g) {\n        print "Найдено совпадение: $result\\n";\n    }\n}\n\nclose MYFILE;\n\n```\n\nТеперь, чтобы вызвать этот скрипт из кода на Kotlin и обработать результат в приложении Android, вам потребуется использовать `Process` и `OutputStream`. Вот пример кода на Kotlin:\n\n```kotlin\nimport kotlin.system.ProcessManager\nimport kotlin.io.BufferedReader\nimport kotlin.io.FileReader\nimport kotlin.io.LineEnding\nimport kotlin.text.Charsets\n\nfun main() {\n    val processManager = ProcessManager.currentProcess()\n\n    val command = "perl your_script.pl"\n    val output = processManager.execute(command, emptyMap())\n\n    val reader = BufferedReader(\n        object : InputStreamReader(output.inputStream, Charsets.UTF_8),\n        8192\n    )\n\n    var result = ""\n    while (reader.readLine(result)) {\n        println("Результат: $result")\n    }\n\n    reader.close()\n}\n\n```\n\nВ этом примере мы используем `ProcessManager.currentProcess()` для запуска нового процесса и выполнения скрипта на Perl. Затем мы используем `BufferedReader` для чтения вывода из процесса. Обратите внимание, что вам может потребоваться настроить кодировку вывода, чтобы она соответствовала кодировке вашего текстового файла.\n\nОбратите внимание, что вам также может потребоваться настроить разрешения для выполнения скрипта на Perl и доступа к файлам в вашем Android-приложении.',
            timestamp: '2024-01-07T13:16:30',
        },
        {
            id: 28,
            type: 'bot',
            text: 'Конечно, вот пример кода на TypeScript для создания интерфейса для управления списком задач:\n```typescript\nimport { Component } from \'@angular/core\';\n\n@Component({\n  selector: \'app-tasks\',\n  templateUrl: \'./tasks.component.html\',\n  styleUrls: [\'./tasks.component.css\']\n})\nexport class TasksComponent implements OnInit {\n  private tasks: Task[] = [];\n\n  constructor() { }\n\n  ngOnInit() {\n    this.tasks = [\n      { id: 1, title: \'Task 1\', description: \'Description 1\' },\n      { id: 2, title: \'Task 2\', description: \'Description 2\' },\n      { id: 3, title: \'Task 3\', description: \'Description 3\' }\n    ];\n  }\n\n  addTask() {\n    this.tasks.push({ id: this.tasks.length + 1, title: \'\', description: \'\' });\n  }\n\n  deleteTask(id: number) {\n    this.tasks = this.tasks.filter(task => task.id !== id);\n  }\n\n  editTask(id: number, title: string, description: string) {\n    const index = this.tasks.findIndex(task => task.id === id);\n    if (index !== -1) {\n      this.tasks[index].title = title;\n      this.tasks[index].description = description;\n    }\n  }\n\n  saveTask() {\n    // Сохраняем данные в базе данных\n  }\n}\n\n```\nА вот пример кода на PHP для реализации серверной части с сохранением и загрузкой данных в базе данных:\n```php\n<?php\n// Подключение к базе данных\n$servername = "localhost";\n$username = "username";\n$password = "password";\n$dbname = "database";\n\n$conn = new mysqli($servername, $username, $password, $dbname);\n\n// Проверка подключения\nif ($conn->connect_error) {\n  die("Connection failed: " . $conn->connect_error);\n}\n\n// Создание таблицы задач\n$sql = "CREATE TABLE tasks (id INT(6) UNSIGNED AUTO_INCREMENT PRIMARY KEY, title VARCHAR(100), description TEXT)";\n\nif ($conn->query($sql) === TRUE) {\n  echo "Table tasks created successfully";\n} else {\n  echo "Error creating table: " . $conn->error;\n}\n\n// Добавление задачи\n$title = $_POST[\'title\'];\n$description = $_POST[\'description\'];\n$sql = "INSERT INTO tasks (title, description) VALUES (\'$title\', \'$description\')";\n\nif ($conn->query($sql) === TRUE) {\n  echo "New task has been added";\n} else {\n  echo "Error adding task: " . $conn->error;\n}\n\n// Изменение задачи\n$id = $_POST[\'id\'];\n$title = $_POST[\'title\'];\n$description = $_POST[\'description\'];\n$sql = "UPDATE tasks SET title = \'$title\', description = \'$description\' WHERE id = $id";\n\nif ($conn->query($sql) === TRUE) {\n  echo "Task has been edited";\n} else {\n  echo "Error editing task: " . $conn->error;\n}\n\n// Загрузка данных\n$sql = "SELECT * FROM tasks";\n\nif ($conn->query($sql) === TRUE) {\n  while ($row = $conn->fetch_assoc()) {\n    echo "ID: " . $row[\'id\'] . ", Title: " . $row[\'title\'] . ", Description: " . $row[\'description\'];\n  }\n} else {\n  echo "Error loading tasks: " . $conn->error;\n}\n\n$conn->close();\n?>\n\n```\nОбратите внимание, что в коде PHP используется mysqli для подключения к базе данных MySQL. Вы должны заменить "username", "password" и "database" на свои реальные данные для подключения к базе данных.',
            timestamp: '2024-01-07T13:16:30',
        },
        {
            id: 29,
            type: 'user',
            text: 'Отлично, буду использовать эти методы. Спасибо за помощь!',
            timestamp: '2024-01-07T12:55:00',
        },
    ];

    const messageRef = useRef(null)
    useEffect(() => {
        messageRef.current.scrollTop = messageRef.current.scrollHeight;
    }, [])

    return (
        <div ref={messageRef} className='messages-wrapper'>
            <div className='messages-container'>
                {chatData.map((element) => (
                    <MessageHandler key={element.id} element={element} />
                ))}
            </div>
        </div>
    )
}
