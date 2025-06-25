import 'package:flutter/material.dart';
import 'data.dart';

class QuizPage extends StatefulWidget {
  const QuizPage({super.key});

  @override
  State<QuizPage> createState() => _QuizPageState();
}

class _QuizPageState extends State<QuizPage> {
  int currentIndex = 0;
  int score = 0;

  void checkAnswer(int selectedIndex) {
    if (questions[currentIndex].correctIndex == selectedIndex) {
      score++;
    }

    setState(() {
      currentIndex++;
    });
  }

  @override
  Widget build(BuildContext context) {
    if (currentIndex >= questions.length) {
      return Scaffold(
        body: Center(
          child: Column(
            mainAxisAlignment: MainAxisAlignment.center,
            children: [
              Text('Pontuação final: $score/${questions.length}',
                  style: const TextStyle(fontSize: 24)),
              const SizedBox(height: 20),
              ElevatedButton(
                onPressed: () => setState(() {
                  score = 0;
                  currentIndex = 0;
                }),
                child: const Text('Jogar Novamente'),
              ),
            ],
          ),
        ),
      );
    }

    final question = questions[currentIndex];

    return Scaffold(
      appBar: AppBar(
        title: const Text('Quiz Bíblico 📖'),
        centerTitle: true,
      ),
      body: Padding(
        padding: const EdgeInsets.all(20),
        child: Column(
          children: [
            Text(
              question.text,
              style: const TextStyle(fontSize: 22),
            ),
            const SizedBox(height: 20),
            ...List.generate(question.options.length, (i) {
              return Padding(
                padding: const EdgeInsets.symmetric(vertical: 8),
                child: ElevatedButton(
                  onPressed: () => checkAnswer(i),
                  style: ElevatedButton.styleFrom(
                    backgroundColor: Colors.amber,
                    minimumSize: const Size.fromHeight(50),
                  ),
                  child: Text(
                    question.options[i],
                    style: const TextStyle(color: Colors.black),
                  ),
                ),
              );
            }),
          ],
        ),
      ),
    );
  }
}
