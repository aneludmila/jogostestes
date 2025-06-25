import 'package:flutter/material.dart';
import 'quiz_page.dart';

void main() {
  runApp(const QuizBiblicoApp());
}

class QuizBiblicoApp extends StatelessWidget {
  const QuizBiblicoApp({super.key});

  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      title: 'Quiz Bíblico',
      debugShowCheckedModeBanner: false,
      theme: ThemeData.dark().copyWith(
        primaryColor: Colors.amber,
        scaffoldBackgroundColor: const Color(0xFF1D1E33),
      ),
      home: const QuizPage(),
    );
  }
}
