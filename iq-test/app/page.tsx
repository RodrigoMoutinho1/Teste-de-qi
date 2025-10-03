"use client"

import { motion } from "framer-motion"
import { useState, useEffect, useCallback } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Progress } from '@/components/ui/progress'
import { Badge } from '@/components/ui/badge'
import { Brain, Clock, Star, CheckCircle, CreditCard, Trophy, Zap } from 'lucide-react'

// As 40 perguntas do seu teste original
const questions = [
  // Lógica e Raciocínio (10 perguntas)
  { id: 1, category: "Lógica", question: "Se todos os A são B, e todos os B são C, então:", options: ["Todos os A são C", "Alguns A são C", "Nenhum A é C", "Não é possível determinar"], correct: 0 },
  { id: 2, category: "Lógica", question: "Complete a sequência: 2, 6, 12, 20, 30, ?", options: ["40", "42", "44", "46"], correct: 1 },
  { id: 3, category: "Lógica", question: "Se João é mais alto que Pedro, e Pedro é mais alto que Maria, então:", options: ["Maria é mais alta que João", "João é mais alto que Maria", "Pedro é o mais baixo", "Não é possível determinar"], correct: 1 },
  { id: 4, category: "Lógica", question: "Qual número não pertence à série: 3, 7, 11, 15, 18, 23?", options: ["3", "15", "18", "23"], correct: 2 },
  { id: 5, category: "Lógica", question: "Se A = 1, B = 2, C = 3... então CASA = ?", options: ["18", "19", "20", "21"], correct: 1 },
  { id: 6, category: "Lógica", question: "Complete: 1, 4, 9, 16, 25, ?", options: ["30", "35", "36", "49"], correct: 2 },
  { id: 7, category: "Lógica", question: "Se hoje é terça-feira, que dia será daqui a 100 dias?", options: ["Segunda", "Terça", "Quarta", "Quinta"], correct: 0 },
  { id: 8, category: "Lógica", question: "Quantos triângulos há na figura com 4 linhas que se cruzam formando uma estrela?", options: ["6", "8", "10", "12"], correct: 1 },
  { id: 9, category: "Lógica", question: "Se 5 máquinas fazem 5 produtos em 5 minutos, quantas máquinas fazem 100 produtos em 100 minutos?", options: ["5", "20", "25", "100"], correct: 0 },
  { id: 10, category: "Lógica", question: "Complete a analogia: Livro está para Biblioteca assim como Quadro está para:", options: ["Pincel", "Tinta", "Museu", "Moldura"], correct: 2 },
  // Matemática (10 perguntas)
  { id: 11, category: "Matemática", question: "Qual é 15% de 200?", options: ["25", "30", "35", "40"], correct: 1 },
  { id: 12, category: "Matemática", question: "Se x + 5 = 12, então x = ?", options: ["5", "6", "7", "8"], correct: 2 },
  { id: 13, category: "Matemática", question: "Qual é a área de um círculo com raio 3?", options: ["6π", "9π", "12π", "18π"], correct: 1 },
  { id: 14, category: "Matemática", question: "Se um produto custa R$ 80 e tem 25% de desconto, qual o preço final?", options: ["R$ 55", "R$ 60", "R$ 65", "R$ 70"], correct: 1 },
  { id: 15, category: "Matemática", question: "Qual é o próximo número primo após 17?", options: ["18", "19", "20", "21"], correct: 1 },
  { id: 16, category: "Matemática", question: "Se 3x - 7 = 14, então x = ?", options: ["5", "6", "7", "8"], correct: 2 },
  { id: 17, category: "Matemática", question: "Quantos graus tem a soma dos ângulos internos de um triângulo?", options: ["90°", "180°", "270°", "360°"], correct: 1 },
  { id: 18, category: "Matemática", question: "Se 2^x = 32, então x = ?", options: ["4", "5", "6", "7"], correct: 1 },
  { id: 19, category: "Matemática", question: "Qual é a raiz quadrada de 144?", options: ["10", "11", "12", "13"], correct: 2 },
  { id: 20, category: "Matemática", question: "Se um trem viaja a 60 km/h por 2,5 horas, qual distância percorre?", options: ["120 km", "130 km", "140 km", "150 km"], correct: 3 },
  // Padrões e Sequências (10 perguntas)
  { id: 21, category: "Padrões", question: "Complete: A, C, F, J, O, ?", options: ["S", "T", "U", "V"], correct: 2 },
  { id: 22, category: "Padrões", question: "Qual vem depois: 1, 1, 2, 3, 5, 8, ?", options: ["11", "12", "13", "14"], correct: 2 },
  { id: 23, category: "Padrões", question: "Complete: 100, 81, 64, 49, 36, ?", options: ["20", "25", "30", "35"], correct: 1 },
  { id: 24, category: "Padrões", question: "Qual número completa: 7, 14, 28, 56, ?", options: ["84", "98", "112", "126"], correct: 2 },
  { id: 25, category: "Padrões", question: "Complete a sequência: Z, Y, X, W, V, ?", options: ["T", "U", "S", "R"], correct: 1 },
  { id: 26, category: "Padrões", question: "Qual vem depois: 3, 7, 15, 31, 63, ?", options: ["95", "127", "159", "191"], correct: 1 },
  { id: 27, category: "Padrões", question: "Complete: 2, 5, 11, 23, 47, ?", options: ["71", "83", "95", "107"], correct: 2 },
  { id: 28, category: "Padrões", question: "Qual letra completa: B, D, G, K, P, ?", options: ["T", "U", "V", "W"], correct: 2 },
  { id: 29, category: "Padrões", question: "Complete: 1, 4, 13, 40, 121, ?", options: ["244", "304", "364", "424"], correct: 2 },
  { id: 30, category: "Padrões", question: "Qual vem depois: 6, 12, 24, 48, 96, ?", options: ["144", "168", "192", "216"], correct: 2 },
  // Raciocínio Verbal (10 perguntas)
  { id: 31, category: "Verbal", question: "Qual palavra não pertence ao grupo: Carro, Bicicleta, Avião, Mesa?", options: ["Carro", "Bicicleta", "Avião", "Mesa"], correct: 3 },
  { id: 32, category: "Verbal", question: "RÁPIDO está para DEVAGAR assim como ALTO está para:", options: ["Baixo", "Grande", "Forte", "Claro"], correct: 0 },
  { id: 33, category: "Verbal", question: "Qual é o antônimo de ABUNDANTE?", options: ["Muito", "Escasso", "Grande", "Pequeno"], correct: 1 },
  { id: 34, category: "Verbal", question: "MÉDICO está para HOSPITAL assim como PROFESSOR está para:", options: ["Livro", "Escola", "Aluno", "Quadro"], correct: 1 },
  { id: 35, category: "Verbal", question: "Qual palavra pode ser formada com as letras de AMOR?", options: ["ROMA", "CASA", "MESA", "VIDA"], correct: 0 },
  { id: 36, category: "Verbal", question: "FELIZ está para ALEGRE assim como TRISTE está para:", options: ["Contente", "Melancólico", "Animado", "Satisfeito"], correct: 1 },
  { id: 37, category: "Verbal", question: "Qual palavra não pertence: Vermelho, Azul, Verde, Quadrado?", options: ["Vermelho", "Azul", "Verde", "Quadrado"], correct: 3 },
  { id: 38, category: "Verbal", question: "INÍCIO está para FIM assim como NASCER está para:", options: ["Viver", "Crescer", "Morrer", "Existir"], correct: 2 },
  { id: 39, category: "Verbal", question: "Qual é o sinônimo de PERSPICAZ?", options: ["Lento", "Astuto", "Simples", "Confuso"], correct: 1 },
  { id: 40, category: "Verbal", question: "LIVRO está para LER assim como MÚSICA está para:", options: ["Ver", "Ouvir", "Sentir", "Tocar"], correct: 1 }
];

const TOTAL_QUESTIONS = questions.length;
const TOTAL_TIME = 3600; // 60 minutos em segundos

export default function IQTest() {
  const [currentStep, setCurrentStep] = useState<'landing' | 'test' | 'payment' | 'result'>('landing');
  const [currentQuestion, setCurrentQuestion] = useState(0);
  // CORREÇÃO: Inicializa o array com o tamanho correto para evitar bugs.
  const [answers, setAnswers] = useState<(number | undefined)[]>(new Array(TOTAL_QUESTIONS).fill(undefined));
  const [timeLeft, setTimeLeft] = useState(TOTAL_TIME);
  const [score, setScore] = useState(0);
  const [iqScore, setIqScore] = useState(0);
  const [isLoading, setIsLoading] = useState(false);

  // CORREÇÃO: Timer mais estável usando setInterval e functional update.
  useEffect(() => {
    if (currentStep !== 'test' || timeLeft <= 0) return;

    const interval = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(interval);
          handleFinishTest();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [currentStep, timeLeft]);

  // Funções envolvidas em `useCallback` para otimização
  const formatTime = useCallback((seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  }, []);

  const startTest = useCallback(() => {
    setCurrentStep('test');
    setCurrentQuestion(0);
    setAnswers(new Array(TOTAL_QUESTIONS).fill(undefined));
    setTimeLeft(TOTAL_TIME);
  }, []);

  const handleAnswer = useCallback((answerIndex: number) => {
    setAnswers((prev) => {
      const newAnswers = [...prev];
      newAnswers[currentQuestion] = answerIndex;
      return newAnswers;
    });
    // Adiciona um pequeno delay antes de ir para a próxima pergunta para o usuário ver a seleção.
    setTimeout(() => nextQuestion(), 300);
  }, [currentQuestion]);

  const handleFinishTest = useCallback(() => {
    let correctAnswers = 0;
    answers.forEach((answer, index) => {
      if (answer !== undefined && answer === questions[index].correct) {
        correctAnswers++;
      }
    });
    setScore(correctAnswers);
    // Fórmula de QI do seu código original
    const calculatedIQ = Math.round((correctAnswers / questions.length) * 40 + 80);
    setIqScore(Math.max(70, Math.min(160, calculatedIQ))); // Garante que o QI fique entre 70 e 160
    setCurrentStep('payment');
  }, [answers]);

  const nextQuestion = useCallback(() => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      handleFinishTest();
    }
  }, [currentQuestion, handleFinishTest]);
  
  const prevQuestion = useCallback(() => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
    }
  }, [currentQuestion]);

  const handlePayment = useCallback(() => {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      setCurrentStep('result');
    }, 2000);
  }, []);
  
  const restartTest = useCallback(() => {
    setCurrentStep('landing');
  }, []);

  // TELA 1: PÁGINA INICIAL (com o seu design original + animações)
  if (currentStep === 'landing') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 text-white flex items-center justify-center p-4">
        <div className="container mx-auto px-4 py-8">
          <motion.div initial={{ opacity: 0, y: -30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }} className="text-center mb-12">
            <div className="flex items-center justify-center gap-3 mb-6">
              <Brain className="w-12 h-12 text-yellow-400" />
              <h1 className="text-5xl font-bold bg-gradient-to-r from-yellow-400 to-orange-400 bg-clip-text text-transparent">
                Teste de QI Profissional
              </h1>
            </div>
            <p className="text-xl text-blue-200 max-w-2xl mx-auto">
              Descubra seu verdadeiro potencial intelectual com nosso teste científico de 40 perguntas.
            </p>
          </motion.div>
          
          <div className="grid md:grid-cols-3 gap-6 mb-12">
            <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.2 }}>
              <Card className="bg-white/10 backdrop-blur-sm border-white/20 text-white h-full">
                <CardHeader className="text-center"><Brain className="w-8 h-8 text-yellow-400 mx-auto mb-2" /><CardTitle>40 Perguntas</CardTitle></CardHeader>
                <CardContent><p className="text-center text-blue-200">Teste completo com questões de lógica, matemática, padrões e raciocínio verbal.</p></CardContent>
              </Card>
            </motion.div>
            <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.4 }}>
              <Card className="bg-white/10 backdrop-blur-sm border-white/20 text-white h-full">
                <CardHeader className="text-center"><Clock className="w-8 h-8 text-green-400 mx-auto mb-2" /><CardTitle>60 Minutos</CardTitle></CardHeader>
                <CardContent><p className="text-center text-blue-200">Tempo adequado para demonstrar seu melhor desempenho intelectual.</p></CardContent>
              </Card>
            </motion.div>
            <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.6 }}>
              <Card className="bg-white/10 backdrop-blur-sm border-white/20 text-white h-full">
                <CardHeader className="text-center"><Trophy className="w-8 h-8 text-orange-400 mx-auto mb-2" /><CardTitle>Resultado Detalhado</CardTitle></CardHeader>
                <CardContent><p className="text-center text-blue-200">Análise completa do seu QI com comparação populacional.</p></CardContent>
              </Card>
            </motion.div>
          </div>
          
          <motion.div initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.7, delay: 0.8 }} className="text-center">
            <Card className="max-w-md mx-auto bg-gradient-to-r from-yellow-400/20 to-orange-400/20 backdrop-blur-sm border-yellow-400/30">
              <CardHeader>
                <CardTitle className="text-2xl text-yellow-400">Comece Agora!</CardTitle>
                <CardDescription className="text-blue-200">Teste gratuito • Resultado por apenas R$ 7,99</CardDescription>
              </CardHeader>
              <CardContent>
                <Button onClick={startTest} className="w-full bg-gradient-to-r from-yellow-400 to-orange-400 text-black font-bold text-lg py-6 hover:from-yellow-300 hover:to-orange-300 transition-all duration-300 transform hover:scale-105">
                  <Zap className="w-5 h-5 mr-2" /> Iniciar Teste de QI
                </Button>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    );
  }

  // TELA 2: TESTE EM ANDAMENTO (com o seu design original)
  if (currentStep === 'test') {
    const progress = ((currentQuestion) / questions.length) * 100;
    const question = questions[currentQuestion];

    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 to-slate-800 text-white flex items-center justify-center p-4">
        <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="w-full">
          <div className="container mx-auto max-w-4xl">
            <div className="flex justify-between items-center mb-8">
              <div className="flex items-center gap-4"><Brain className="w-8 h-8 text-blue-400" /><h1 className="text-2xl font-bold text-white">Teste de QI</h1></div>
              <div className="flex items-center gap-6">
                <div className="flex items-center gap-2"><Clock className="w-5 h-5 text-green-400" /><span className="text-lg font-mono text-white">{formatTime(timeLeft)}</span></div>
                <Badge variant="secondary" className="text-lg px-3 py-1 bg-slate-700 text-white">{currentQuestion + 1} / {questions.length}</Badge>
              </div>
            </div>
            
            <div className="mb-8"><Progress value={progress} className="h-3" /></div>
            
            <Card className="w-full mx-auto bg-slate-800/50 backdrop-blur-sm border-slate-700">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <Badge variant="outline" className="text-blue-400 border-blue-400 bg-blue-400/10">{question.category}</Badge>
                  <span className="text-slate-300">Pergunta {currentQuestion + 1}</span>
                </div>
                <CardTitle className="text-2xl mt-4 text-white font-semibold text-center">{question.question}</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {question.options.map((option, index) => (
                    <Button key={index} variant={answers[currentQuestion] === index ? "default" : "outline"}
                      className={`justify-start text-left p-6 h-auto text-base transition-all duration-200 ${answers[currentQuestion] === index ? "bg-blue-600 hover:bg-blue-700 text-white border-blue-500 scale-105" : "bg-slate-700/50 hover:bg-slate-600/50 border-slate-600 text-slate-100 hover:text-white"}`}
                      onClick={() => handleAnswer(index)}>
                      <span className="font-bold mr-3 text-blue-300">{String.fromCharCode(65 + index)})</span>
                      <span className="flex-1">{option}</span>
                    </Button>
                  ))}
                </div>
                <div className="flex justify-between mt-8 pt-6 border-t border-slate-700">
                  <Button variant="outline" onClick={prevQuestion} disabled={currentQuestion === 0} className="border-slate-600 hover:bg-slate-700 text-white hover:text-white">Anterior</Button>
                  <Button onClick={nextQuestion} className="bg-blue-600 hover:bg-blue-700 text-white">
                    {currentQuestion === questions.length - 1 ? "Finalizar" : "Próxima"}
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </motion.div>
      </div>
    );
  }

  // TELA 3: PAGAMENTO (com o seu design original)
  if (currentStep === 'payment') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-900 via-emerald-900 to-teal-900 text-white flex items-center justify-center p-4">
        <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} className="max-w-2xl mx-auto text-center">
          <CheckCircle className="w-16 h-16 text-green-400 mx-auto mb-6" />
          <h1 className="text-4xl font-bold mb-4">Teste Concluído!</h1>
          <p className="text-xl text-green-200 mb-8">Parabéns! Você respondeu {score} de {questions.length} perguntas corretamente.</p>
          <Card className="bg-white/10 backdrop-blur-sm border-white/20 mb-8">
            <CardHeader>
              <CardTitle className="text-2xl text-yellow-400">🎯 Desbloqueie Seu Resultado Completo</CardTitle>
              <CardDescription className="text-green-200 text-lg">Veja sua pontuação de QI detalhada e análise comparativa.</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="bg-gradient-to-r from-red-500/20 to-orange-500/20 rounded-lg p-6 mb-6">
                <div className="flex items-center justify-center gap-4 mb-4">
                  <span className="text-3xl line-through text-red-400">R$ 25,00</span>
                  <Star className="w-6 h-6 text-yellow-400" />
                  <span className="text-4xl font-bold text-green-400">R$ 7,99</span>
                </div>
                <Badge className="bg-red-500 text-white text-lg px-4 py-2">68% DE DESCONTO - OFERTA LIMITADA!</Badge>
              </div>
              <div className="text-left space-y-3 mb-6">
                <div className="flex items-center gap-3"><CheckCircle className="w-5 h-5 text-green-400" /><span>Sua pontuação exata de QI</span></div>
                <div className="flex items-center gap-3"><CheckCircle className="w-5 h-5 text-green-400" /><span>Comparação com a população mundial</span></div>
                <div className="flex items-center gap-3"><CheckCircle className="w-5 h-5 text-green-400" /><span>Análise detalhada por categoria</span></div>
                <div className="flex items-center gap-3"><CheckCircle className="w-5 h-5 text-green-400" /><span>Certificado digital personalizado</span></div>
              </div>
              <Button onClick={handlePayment} disabled={isLoading} className="w-full bg-gradient-to-r from-green-500 to-emerald-500 text-white font-bold text-xl py-6 hover:from-green-400 hover:to-emerald-400 transition-all duration-300 transform hover:scale-105">
                {isLoading ? "Processando..." : <><CreditCard className="w-6 h-6 mr-3" /> Pagar R$ 7,99 e Ver Resultado</>}
              </Button>
              <p className="text-sm text-green-300 mt-4">🔒 Pagamento 100% seguro • Garantia de 30 dias</p>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    );
  }

  // TELA 4: RESULTADO (com o seu design original)
  if (currentStep === 'result') {
    const getIQLevel = (iq: number) => {
      if (iq >= 140) return { level: "Genial", color: "text-purple-400", description: "Apenas 0.2% da população" };
      if (iq >= 130) return { level: "Muito Superior", color: "text-blue-400", description: "Top 2% da população" };
      if (iq >= 120) return { level: "Superior", color: "text-green-400", description: "Top 9% da população" };
      if (iq >= 110) return { level: "Acima da Média", color: "text-yellow-400", description: "Top 25% da população" };
      if (iq >= 90) return { level: "Média", color: "text-orange-400", description: "50% da população" };
      return { level: "Abaixo da Média", color: "text-red-400", description: "Área de desenvolvimento" };
    };

    const iqLevel = getIQLevel(iqScore);

    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 text-white flex items-center justify-center p-4">
        <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="max-w-4xl mx-auto w-full">
          <div className="text-center mb-8">
            <Trophy className="w-16 h-16 text-yellow-400 mx-auto mb-4" />
            <h1 className="text-4xl font-bold mb-2">Seu Resultado de QI</h1>
            <p className="text-xl text-blue-200">Análise completa do seu desempenho</p>
          </div>
          <Card className="bg-gradient-to-r from-yellow-400/20 to-orange-400/20 backdrop-blur-sm border-yellow-400/30 mb-8">
            <CardContent className="text-center py-12">
              <div className="text-8xl font-bold text-yellow-400 mb-4">{iqScore}</div>
              <div className={`text-2xl font-bold ${iqLevel.color} mb-2`}>{iqLevel.level}</div>
              <p className="text-lg text-blue-200">{iqLevel.description}</p>
            </CardContent>
          </Card>
          <div className="grid md:grid-cols-2 gap-6 mb-8">
            <Card className="bg-slate-800/50 backdrop-blur-sm border-slate-700">
              <CardHeader><CardTitle className="text-blue-400">Desempenho por Categoria</CardTitle></CardHeader>
              <CardContent className="space-y-4">
                {["Lógica", "Matemática", "Padrões", "Verbal"].map((category) => {
                  const categoryQuestions = questions.filter(q => q.category === category);
                  const categoryCorrect = categoryQuestions.reduce((acc, q) => {
                    const globalIndex = questions.findIndex(gq => gq.id === q.id);
                    return acc + (answers[globalIndex] === q.correct ? 1 : 0);
                  }, 0);
                  const percentage = (categoryCorrect / categoryQuestions.length) * 100;
                  return (
                    <div key={category}>
                      <div className="flex justify-between mb-1"><span className="text-white">{category}</span><span className="text-white">{categoryCorrect}/{categoryQuestions.length}</span></div>
                      <Progress value={percentage} className="h-2" />
                    </div>
                  );
                })}
              </CardContent>
            </Card>
            <Card className="bg-slate-800/50 backdrop-blur-sm border-slate-700">
              <CardHeader><CardTitle className="text-green-400">Estatísticas</CardTitle></CardHeader>
              <CardContent className="space-y-4">
                <div className="flex justify-between"><span className="text-white">Acertos:</span><span className="font-bold text-green-400">{score}/{TOTAL_QUESTIONS}</span></div>
                <div className="flex justify-between"><span className="text-white">Percentual:</span><span className="font-bold text-blue-400">{Math.round((score/TOTAL_QUESTIONS)*100)}%</span></div>
                <div className="flex justify-between"><span className="text-white">Tempo usado:</span><span className="font-bold text-yellow-400">{formatTime(TOTAL_TIME - timeLeft)}</span></div>
                <div className="flex justify-between"><span className="text-white">Classificação:</span><span className={`font-bold ${iqLevel.color}`}>{iqLevel.level}</span></div>
              </CardContent>
            </Card>
          </div>
          <div className="text-center">
            <Button onClick={restartTest} className="bg-gradient-to-r from-purple-500 to-blue-500 text-white font-bold text-lg px-8 py-4 hover:from-purple-400 hover:to-blue-400 transition-all duration-300">
              Fazer Novo Teste
            </Button>
          </div>
        </motion.div>
      </div>
    );
  }

  return null;
}
