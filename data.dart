class Question {
  final String text;
  final List<String> options;
  final int correctIndex;

  Question(this.text, this.options, this.correctIndex);
}

final List<Question> questions = [
  Question(
    "Quantos livros há na Bíblia?",
    ["66", "72", "39", "100"],
    0,
  ),
  Question(
    "Quem construiu a arca?",
    ["Moisés", "Abraão", "Noé", "Davi"],
    2,
  ),
  Question(
    "Qual foi o primeiro milagre de Jesus?",
    ["Curar um cego", "Multiplicar pães", "Andar sobre as águas", "Transformar água em vinho"],
    3,
  ),
];
