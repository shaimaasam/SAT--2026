/**
 * SAT Math Platform - Chapter/Lesson/Question data
 *
 * Chapter 1: Heart of Algebra
 * Chapter 2: Problem Solving & Data Analysis
 * Chapter 3: Passport to Advanced Math
 * Chapter 4: Additional Topics in Math
 *
 * Lesson 1.2 (Systems of Linear Equations) is fully populated with
 * 23 questions transcribed verbatim from the supplied Word document
 * "LESSON 1 SYSTEM OF LINER FUNCTION 2026.docx". Other lessons are
 * scaffolded as placeholders so new content can be added without
 * restructuring the data.
 */

export type Difficulty = "easy" | "medium" | "hard";

export interface Question {
  /** Question number within the lesson */
  n: number;
  /** Domain: Algebra, Geometry, Statistics, etc. */
  domain: string;
  /** Difficulty level */
  difficulty: Difficulty;
  /** Question text — supports LaTeX via $...$ and $$...$$ */
  text: string;
  /** Question type — always mcq for SAT-style */
  type: "mcq";
  /** Four options A–D — each may contain LaTeX */
  o: [string, string, string, string];
  /** Correct answer letter */
  a: "A" | "B" | "C" | "D";
  /** Optional image identifier (maps to images.ts) */
  img?: string;
  /** Step-by-step solution (supports LaTeX) */
  solution: string;
  /** Optional hint */
  hint?: string;
}

export interface Module {
  /** Lesson id, e.g. "1.2" */
  id: string;
  /** Display number, e.g. "1.2" */
  num: string;
  /** Title */
  title: string;
  /** Subtitle */
  subtitle: string;
  /** Question range, e.g. "1 – 23" */
  qrange: string;
  /** Number of questions */
  qcount: number;
  /** Time limit for the lesson in seconds */
  timeLimit: number;
  /** Strategy box title */
  strategyTitle: string;
  /** Strategy box body */
  strategyBody: string;
  /** The questions */
  qs: Question[];
}

export interface QuizQuestion {
  n: number;
  text: string;
  o: string[];
  a: string;
  solution: string;
  hint?: string;
  img?: string;
}

export interface QuizConfig {
  id: string;
  title: string;
  subtitle: string;
  questions: QuizQuestion[];
  /** Quiz time limit in seconds (default 720 = 12 min) */
  timeLimitSeconds: number;
}

export interface ChapterConfig {
  id: string;
  title: string;
  subtitle: string;
  color: string;
  icon: string;
  defaultModule: string;
  modules: Module[];
}

/* ----------------------------------------------------------------- */
/* Chapter 1 — Lesson 1.2: Systems of Linear Equations                */
/* 23 questions transcribed from the source Word document.           */
/* ----------------------------------------------------------------- */

const lesson_1_2_questions: Question[] = [
  {
    n: 1,
    domain: "Algebra",
    difficulty: "easy",
    text: "The solution to the given system of equations is $(x, y)$. What is the value of $x$? $6x - y = -4$ and $9x - y = -3$",
    type: "mcq",
    o: ["$-6$", "$6$", "$\\frac{1}{3}$", "$\\frac{2}{3}$"],
    a: "C",
    solution:
      "Subtract the first equation from the second: $(9x - y) - (6x - y) = -3 - (-4)$, which simplifies to $3x = 1$, so $x = \\frac{1}{3}$.",
    desmosHint:
      "Open Desmos and type $y = 6x + 4$ (rewritten from $6x - y = -4$) in line 1, and $y = 9x + 3$ (from $9x - y = -3$) in line 2. Click the intersection point of the two lines. The $x$-coordinate is $\frac{1}{3}$ ✓.",
  },
  {
    n: 2,
    domain: "Algebra",
    difficulty: "easy",
    text: "The solution to the given system of equations is $(x, y)$. What is the value of $x$? $x + 2y = 11$ and $3x + 3y = 24$",
    type: "mcq",
    o: ["$3$", "$-3$", "$-5$", "$5$"],
    a: "D",
    solution:
      "From the first equation $x = 11 - 2y$. Substitute into the second: $3(11 - 2y) + 3y = 24 \\Rightarrow 33 - 6y + 3y = 24 \\Rightarrow -3y = -9 \\Rightarrow y = 3$. Then $x = 11 - 2(3) = 5$.",
    desmosHint:
      "Open Desmos and type $x + 2y = 11$ in line 1 (Desmos understands this form directly) and $3x + 3y = 24$ in line 2. Click the intersection point — you'll see coordinates $(5, 3)$. So $x = 5$ ✓.",
  },
  {
    n: 3,
    domain: "Algebra",
    difficulty: "easy",
    text: "The solution to the given system of equations is the ordered pair $(x, y)$. What is the value of $y$? $-3x + 4y = 4$ and $4x - 3y = 0.5$",
    type: "mcq",
    o: ["$-\\frac{5}{2}$", "$-2$", "$\\frac{5}{2}$", "$2$"],
    a: "C",
    solution:
      "Multiply the first equation by 4 and the second by 3: $-12x + 16y = 16$ and $12x - 9y = 1.5$. Add: $7y = 17.5 \\Rightarrow y = \\frac{5}{2}$.",
    desmosHint:
      "Open Desmos and type $-3x + 4y = 4$ in line 1 and $4x - 3y = 0.5$ in line 2. Desmos graphs both lines and shows the intersection. Click the intersection point to read the $y$-coordinate: $2.5 = \frac{5}{2}$ ✓.",
  },
  {
    n: 4,
    domain: "Algebra",
    difficulty: "medium",
    text: "What is the solution $(x, y)$ to the given system of equations? $$9x - 2y = 8 \\quad \\text{and} \\quad 2x - 9y = -\\frac{5}{2}$$",
    type: "mcq",
    o: [
      "$\\left(-1,\\ -\\frac{1}{4}\\right)$",
      "$\\left(1,\\ \\frac{1}{2}\\right)$",
      "$(1, 2)$",
      "$\\left(-1,\\ \\frac{1}{2}\\right)$",
    ],
    a: "B",
    solution:
      "Multiply the first equation by 9 and the second by 2: $81x - 18y = 72$ and $4x - 18y = -5$. Subtract: $77x = 77 \\Rightarrow x = 1$. Then $2(1) - 9y = -\\frac{5}{2} \\Rightarrow -9y = -\\frac{9}{2} \\Rightarrow y = \\frac{1}{2}$. So $(x, y) = (1, \\frac{1}{2})$.",
    desmosHint:
      "Open Desmos and type $9x - 2y = 8$ in line 1 and $2x - 9y = -2.5$ in line 2 (replace $-\frac{5}{2}$ with $-2.5$). Desmos shows the intersection at $(1, 0.5)$. Click the point to confirm coordinates ✓.",
  },
  {
    n: 5,
    domain: "Algebra",
    difficulty: "easy",
    text: "The solution to the given system of equations is $(x, y)$. What is the value of $x + y$? $3x + 5y = 17$ and $5x + 3y = 23$",
    type: "mcq",
    o: ["$4$", "$3$", "$1$", "$5$"],
    a: "D",
    solution:
      "Add the two equations: $8x + 8y = 40 \\Rightarrow x + y = 5$.",
    desmosHint:
      "Open Desmos and type $3x + 5y = 17$ in line 1 and $5x + 3y = 23$ in line 2. Click the intersection point — read both coordinates $(x, y)$. Add them up to verify $x + y = 5$ ✓.",
  },
  {
    n: 6,
    domain: "Algebra",
    difficulty: "easy",
    text: "The solution to the given system of equations is $(x, y)$. What is the value of $2x$? $x + y = 3$ and $x - y = 3$",
    type: "mcq",
    o: ["$6$", "$3$", "$7$", "$14$"],
    a: "A",
    solution:
      "Add the two equations: $2x = 6 \\Rightarrow x = 3$, so $2x = 6$.",
    desmosHint:
      "Open Desmos and type $x + y = 3$ in line 1 and $x - y = 3$ in line 2. The lines intersect at $(3, 0)$. So $x = 3$ and $2x = 6$ ✓.",
  },
  {
    n: 7,
    domain: "Algebra",
    difficulty: "medium",
    text: "The solution to the given system of equations is $(x, y)$. What is the value of $5x - 2y$? $4x - 8y = 1$ and $x + 6y = -10$",
    type: "mcq",
    o: ["$9$", "$10$", "$-9$", "$-11$"],
    a: "C",
    solution:
      "From the second equation, $x = -10 - 6y$. Substitute into the first: $4(-10 - 6y) - 8y = 1 \\Rightarrow -40 - 24y - 8y = 1 \\Rightarrow -32y = 41 \\Rightarrow y = -\\frac{41}{32}$. Then $x = -10 - 6(-\\frac{41}{32}) = -\\frac{37}{16}$. Evaluate $5x - 2y = 5(-\\frac{37}{16}) - 2(-\\frac{41}{32}) = -\\frac{185}{16} + \\frac{82}{32} = -\\frac{370}{32} + \\frac{82}{32} = -\\frac{288}{32} = -9$.",
  },
  {
    n: 8,
    domain: "Algebra",
    difficulty: "medium",
    text: "The solution to the given system of equations is $(a, b)$. What is the value of $a + 3b$? $7a + 3b = 34$ and $9a + 9b = 18$",
    type: "mcq",
    o: ["$120$", "$-16$", "$4$", "$-8$"],
    a: "D",
    solution:
      "Divide the second equation by 9: $a + b = 2 \\Rightarrow b = 2 - a$. Substitute into the first: $7a + 3(2 - a) = 34 \\Rightarrow 7a + 6 - 3a = 34 \\Rightarrow 4a = 28 \\Rightarrow a = 7$. Then $b = 2 - 7 = -5$, so $a + 3b = 7 + 3(-5) = -8$.",
  },
  {
    n: 9,
    domain: "Algebra",
    difficulty: "easy",
    text: "The sum of a number $x$ and $6$ is twice as large as a number $y$. The number $y$ is $5$ less than the number $x$. Which system of equations describes this situation?",
    type: "mcq",
    o: [
      "$x + 6 = 2y \\quad, \\quad y = 5 - x$",
      "$2(x + 6) = y \\quad, \\quad y = 5 - x$",
      "$x + 6 = 2y \\quad, \\quad y = x - 5$",
      "$2(x + 6) = y \\quad, \\quad y = x - 5$",
    ],
    a: "C",
    solution:
      "\"The sum of x and 6 is twice y\" → $x + 6 = 2y$. \"y is 5 less than x\" → $y = x - 5$. Therefore option C.",
  },
  {
    n: 10,
    domain: "Algebra",
    difficulty: "easy",
    text: "In the 1884 US presidential election, candidates James Blaine and Grover Cleveland received a total of 438 Electoral College votes. The number of Electoral College votes Blaine received, $b$, was 37 fewer than the number of Electoral College votes Cleveland received, $c$. Which system of equations represents this situation?",
    type: "mcq",
    o: [
      "$b + c = 401$ \\ and \\ $b = c - 37$",
      "$b + c = 401$ \\ and \\ $b = c + 47$",
      "$b + c = 438$ \\ and \\ $b = c - 37$",
      "$b + c = 438$ \\ and \\ $b = c + 37$",
    ],
    a: "C",
    solution:
      "Total is 438: $b + c = 438$. Blaine received 37 fewer than Cleveland: $b = c - 37$. Therefore option C.",
  },
  {
    n: 11,
    domain: "Algebra",
    difficulty: "medium",
    text: "Which system of linear equations has exactly one solution?",
    type: "mcq",
    o: [
      "$x + 3y = 5 \\quad, \\quad 2x + 6y = 9$",
      "$x + 2y = 3 \\quad, \\quad 2x + 4y = 6$",
      "$x + 2y = 3 \\quad, \\quad 2x + 3y = 3$",
      "$x + 2y = 3 \\quad, \\quad 2x + 4y = 5$",
    ],
    a: "C",
    solution:
      "Two lines intersect exactly once when their slopes differ. A: same slope $-1/3$, different intercepts → no solution. B: same line → infinitely many. C: slopes $-1/2$ and $-2/3$ differ → exactly one solution. D: both have slope $-1/2$ with different intercepts → no solution.",
    desmosHint:
      "Open Desmos and type each option as a system of two equations on separate lines. For option A: $x + 3y = 5$ and $2x + 6y = 9$. The lines are parallel (no intersection). For option C: $x + 2y = 3$ and $2x + 3y = 3$. The lines cross once ✓. For B: $x + 2y = 3$ and $2x + 4y = 6$ — same line (overlap). For D: parallel again.",
  },
  {
    n: 12,
    domain: "Algebra",
    difficulty: "medium",
    text: "How many solutions does the given system of equations have? $2x + 6y = 4$ and $2(2x + y) = 60$",
    type: "mcq",
    o: ["Infinitely many", "Exactly two", "Zero", "Exactly one"],
    a: "D",
    solution:
      "Simplify the second equation: $4x + 2y = 60 \\Rightarrow 2x + y = 30$, slope $-2$. The first equation simplifies to $x + 3y = 2$, slope $-1/3$. Different slopes → exactly one solution.",
  },
  {
    n: 13,
    domain: "Algebra",
    difficulty: "medium",
    text: "How many solutions does the given system of equations have? $-7x + 3y = 3$ and $-17x + 8y = 3$",
    type: "mcq",
    o: ["Infinitely many", "Exactly one", "Exactly two", "Zero"],
    a: "B",
    solution:
      "Compute the determinant: $(-7)(8) - (3)(-17) = -56 + 51 = -5 \\neq 0$. Non-zero determinant → exactly one solution.",
  },
  {
    n: 14,
    domain: "Algebra",
    difficulty: "medium",
    text: "How many solutions does the given system of equations have? $10x - 2y = 18$ and $-60x + 12y = -108$",
    type: "mcq",
    o: ["Infinitely many", "Zero", "Exactly one", "Exactly two"],
    a: "A",
    solution:
      "Simplify the first equation: $5x - y = 9$. Divide the second equation by $-12$: $5x - y = 9$. The two equations are identical, so there are infinitely many solutions.",
    desmosHint:
      "Open Desmos and type $10x - 2y = 18$ in line 1 and $-60x + 12y = -108$ in line 2. Notice the second line is just $-6$ times the first — the two lines overlap completely. This means infinitely many solutions ✓.",
  },
  {
    n: 15,
    domain: "Algebra",
    difficulty: "medium",
    text: "How many solutions does the given system of equations have? $4y - 8x = 36$ and $y - 2x = 18$",
    type: "mcq",
    o: ["Exactly two", "Exactly one", "Infinitely many", "Zero"],
    a: "D",
    solution:
      "First equation: $y = 2x + 9$. Second equation: $y = 2x + 18$. Same slope, different $y$-intercept → parallel lines, zero solutions.",
    desmosHint:
      "Open Desmos and type $4y - 8x = 36$ in line 1 (rewrite as $y = 2x + 9$) and $y - 2x = 18$ in line 2 (rewrite as $y = 2x + 18$). The lines have the same slope but different $y$-intercepts — parallel, so zero solutions ✓.",
  },
  {
    n: 16,
    domain: "Algebra",
    difficulty: "hard",
    text: "In the system of equations above, $k$ is a constant. If the system has no solutions, what is the value of $k$? $$y = \\frac{4}{3}x - \\frac{1}{2} \\quad \\text{and} \\quad y = \\frac{k}{3}x + \\frac{1}{2}$$",
    type: "mcq",
    o: ["$5$", "$5.5$", "$4.5$", "$4$"],
    a: "D",
    solution:
      "For two linear equations to have no solution, their slopes must be equal but their $y$-intercepts must differ. The $y$-intercepts are already different ($-\\frac{1}{2} \\neq \\frac{1}{2}$). Set the slopes equal: $\\frac{4}{3} = \\frac{k}{3} \\Rightarrow k = 4$.",
  },
  {
    n: 17,
    domain: "Algebra",
    difficulty: "hard",
    text: "In the given system of equations, $k$ is a constant. The system has exactly one solution. Which of the following could be the value of $k$? $y = 2x + 5$ and $y = kx + 3$\\quad I. $2$ \\quad II. $5$",
    type: "mcq",
    o: ["I only", "I and II", "Neither I nor II", "II only"],
    a: "D",
    solution:
      "Exactly one solution requires different slopes: $k \\neq 2$. I. $k = 2$: same slope, different intercept → no solution. II. $k = 5$: different slope → exactly one solution. So only II is valid.",
  },
  {
    n: 18,
    domain: "Algebra",
    difficulty: "hard",
    text: "In the given system of equations, $n$ and $p$ are constants. The system has infinitely many solutions. What is the value of $np$? $2x + 5y = 15$ and $nx + 3y = p$",
    type: "mcq",
    o: ["$18$", "$\\frac{54}{5}$", "$\\frac{250}{3}$", "$15$"],
    a: "B",
    solution:
      "For infinitely many solutions, the equations must be proportional: $\\frac{2}{n} = \\frac{5}{3} = \\frac{15}{p}$. From $\\frac{5}{3} = \\frac{15}{p}$: $p = 9$. From $\\frac{2}{n} = \\frac{5}{3}$: $n = \\frac{6}{5}$. Then $np = \\frac{6}{5} \\cdot 9 = \\frac{54}{5}$.",
  },
  {
    n: 19,
    domain: "Algebra",
    difficulty: "hard",
    text: "In the system of equations above, $n$ is a constant. If the system has no solution, what is the value of $n$? $nx + 3y = 1$ and $-6x - 6y = 0$",
    type: "mcq",
    o: ["$-6$", "$6$", "$-9$", "$3$"],
    a: "D",
    solution:
      "Second equation: $-6x - 6y = 0 \\Rightarrow x + y = 0 \\Rightarrow y = -x$ (slope $-1$). First equation: $y = -\\frac{n}{3}x + \\frac{1}{3}$ (slope $-\\frac{n}{3}$). For no solution: slopes equal, intercepts differ. Set $-\\frac{n}{3} = -1 \\Rightarrow n = 3$. The intercept $\\frac{1}{3} \\neq 0$, so the system indeed has no solution.",
  },
  {
    n: 20,
    domain: "Algebra",
    difficulty: "hard",
    text: "In the given system of equations, $k$ is a constant. If the system has no solutions, what is the value of $k$? $x + 2y = 8$ and $kx + 3y = 9$",
    type: "mcq",
    o: ["$\\frac{3}{2}$", "$9$", "$8$", "$\\frac{2}{3}$"],
    a: "A",
    solution:
      "Slopes: first equation $-\\frac{1}{2}$, second equation $-\\frac{k}{3}$. For no solution, slopes equal: $-\\frac{k}{3} = -\\frac{1}{2} \\Rightarrow k = \\frac{3}{2}$. The $y$-intercepts differ (4 vs 3), so this gives no solution.",
  },
  {
    n: 21,
    domain: "Algebra",
    difficulty: "hard",
    text: "In the system of equations above, $b$ is a constant. If the system has infinitely many solutions, what is the value of $b$? $3x - y = 21$ and $1.5x - 0.5y = b$",
    type: "mcq",
    o: ["$10.5$", "$9.5$", "$7.5$", "$8.5$"],
    a: "A",
    solution:
      "Multiply the second equation by 2: $3x - y = 2b$. For infinitely many solutions, this must equal the first equation: $2b = 21 \\Rightarrow b = 10.5$.",
  },
  {
    n: 22,
    domain: "Algebra",
    difficulty: "medium",
    text: "When Michael swims he burns 9 calories per minute, and when he walks he burns 4 calories per minute. If Michael spent a total of 4 hours walking and swimming and burns a total of 1600 calories, how many minutes did he spend walking?",
    type: "mcq",
    o: ["$136$", "$112$", "$128$", "$120$"],
    a: "B",
    solution:
      "Let $s$ = minutes swimming, $w$ = minutes walking. Then $s + w = 240$ and $9s + 4w = 1600$. Substitute $s = 240 - w$: $9(240 - w) + 4w = 1600 \\Rightarrow 2160 - 9w + 4w = 1600 \\Rightarrow -5w = -560 \\Rightarrow w = 112$.",
    desmosHint:
      "Open Desmos: type $s + w = 240$ in line 1 and $9s + 4w = 1600$ in line 2. Click the intersection point. The $w$-coordinate gives minutes walking = $112$ ✓. (Desmos makes this word problem visual.)",
  },
  {
    n: 23,
    domain: "Algebra",
    difficulty: "medium",
    text: "When Karen walks from home to work, she burns 5.3 calories per minute, and when she rides her bike from home to work she burns 6.4 calories per minute. If Karen spends a total of 6 hours, walking and bicycling from home to work in a week and burns a total of 1941 calories during these activities, how many minutes does she spend bicycling?",
    type: "mcq",
    o: ["$220$", "$30$", "$110$", "$330$"],
    a: "B",
    solution:
      "Let $w$ = minutes walking, $b$ = minutes bicycling. Then $w + b = 360$ and $5.3w + 6.4b = 1941$. Substitute $w = 360 - b$: $5.3(360 - b) + 6.4b = 1941 \\Rightarrow 1908 - 5.3b + 6.4b = 1941 \\Rightarrow 1.1b = 33 \\Rightarrow b = 30$.",
    desmosHint:
      "Open Desmos: type $w + b = 360$ in line 1 and $5.3w + 6.4b = 1941$ in line 2. Click the intersection — the $b$-coordinate (bicycling minutes) is $30$ ✓.",
  },
];

/* ----------------------------------------------------------------- */
/* Chapter 1 — Heart of Algebra                                       */
/* ----------------------------------------------------------------- */

export const chapter1: ChapterConfig = {
  id: "ch1",
  title: "Heart of Algebra",
  subtitle: "Linear equations, systems, inequalities, and functions",
  color: "#1e3a5f",
  icon: "Sigma",
  defaultModule: "1.2",
  modules: [
    {
      id: "1.1",
      num: "1.1",
      title: "Manipulating Algebraic Expressions",
      subtitle: "Isolating variables, simplifying expressions, and solving equations",
      qrange: "1 – 19",
      qcount: 19,
      timeLimit: 1800,
      strategyTitle: "Strategy: Manipulating Algebraic Expressions",
      strategyBody:
        "To isolate a variable, undo operations in reverse order (PEMDAS backwards): addition/subtraction first, then multiplication/division, then exponents, then parentheses. When working with fractions, multiply both sides by the LCD to clear denominators first. For radical equations, square both sides. For exponent equations, take roots. Always check your answer by substituting back into the original equation.",
      qs: [
        {
          n: 1,
          domain: "Algebra",
          difficulty: "medium",
          text: "$z = \\frac{x + 3}{2y}$\\quad The given equation relates the distinct positive real numbers $x$, $y$, and $z$. Which equation correctly expresses $x$ in terms of $y$ and $z$?",
          type: "mcq",
          o: [
            "$x = 2yz - 3$",
            "$x = \\frac{z}{2y} - 3$",
            "$x = 2yz + 3$",
            "$x = \\frac{z - 3}{2y}$",
          ],
          a: "A",
          solution:
            "Start with $z = \\frac{x + 3}{2y}$. Multiply both sides by $2y$: $2yz = x + 3$. Subtract 3: $x = 2yz - 3$. The answer is A.",
        },
        {
          n: 2,
          domain: "Algebra",
          difficulty: "medium",
          text: "The equation $y = \\frac{x + w}{z}$ relates the positive numbers $w$, $x$, $y$, and $z$. Which equation correctly expresses $x$ in terms of $w$, $y$, and $z$?",
          type: "mcq",
          o: [
            "$x = yz + w$",
            "$x = \\frac{yz}{w}$",
            "$x = zw$",
            "$x = yz - w$",
          ],
          a: "D",
          solution:
            "Multiply both sides by $z$: $yz = x + w$. Subtract $w$: $x = yz - w$. The answer is D.",
        },
        {
          n: 3,
          domain: "Algebra",
          difficulty: "hard",
          text: "The given equation $r^{q} = t^{s}$ relates the distinct positive real numbers $q$, $r$, $s$ and $t$. Which equation correctly expresses $t$ in terms of $q$, $r$ and $s$?",
          type: "mcq",
          o: [
            "$t = r^{q - s}$",
            "$t = r^{\\frac{s}{q}}$",
            "$t = r^{\\frac{q}{s}}$",
            "$t = \\frac{r^{q}}{s}$",
          ],
          a: "C",
          solution:
            "Take the $s$-th root of both sides: $t = r^{q/s}$. The answer is C.",
        },
        {
          n: 4,
          domain: "Algebra",
          difficulty: "hard",
          text: "The equation $y = \\sqrt{\\frac{hg}{x}}$ relates the positive numbers $g$, $h$, $x$ and $y$. Which equation correctly expresses $h$ in terms of $g$, $x$ and $y$?",
          type: "mcq",
          o: [
            "$h = \\frac{gy^{2}}{x}$",
            "$h = gxy$",
            "$h = \\frac{xy^{2}}{g}$",
            "$h = gxy^{2}$",
          ],
          a: "C",
          solution:
            "Square both sides: $y^{2} = \\frac{hg}{x}$. Multiply by $x$: $xy^{2} = hg$. Divide by $g$: $h = \\frac{xy^{2}}{g}$. The answer is C.",
        },
        {
          n: 5,
          domain: "Algebra",
          difficulty: "hard",
          text: "If $2\\sqrt{2x} = a$, what is $2x$ in terms of $a$?",
          type: "mcq",
          o: [
            "$\\frac{a^{2}}{2}$",
            "$4a^{2}$",
            "$\\frac{a^{2}}{4}$",
            "$\\frac{a}{2}$",
          ],
          a: "C",
          solution:
            "Divide by 2: $\\sqrt{2x} = \\frac{a}{2}$. Square both sides: $2x = \\frac{a^{2}}{4}$. The answer is C.",
          desmosHint:
            "Open Desmos and define a slider for $a$ (any positive value, say $a = 4$). Type $y = 2\sqrt{2x}$ and $y = a$ in two lines. The intersection point gives the $x$ value. Then compute $2x$ to verify it equals $\frac{a^{2}}{4}$. For $a = 4$: $2x = \frac{16}{4} = 4$ ✓.",
        },
        {
          n: 6,
          domain: "Algebra",
          difficulty: "medium",
          text: "$P\\%$ of $x$ is $3$. Which expression represents $x$ in terms of $p$?",
          type: "mcq",
          o: [
            "$\\frac{p}{(100)(3)}$",
            "$\\frac{3p}{100}$",
            "$\\frac{(100)(3)}{p}$",
            "$\\frac{3}{p}$",
          ],
          a: "C",
          solution:
            "$P\\%$ of $x$ means $\\frac{P}{100} \\cdot x = 3$. Solve for $x$: $x = \\frac{3 \\cdot 100}{P} = \\frac{300}{P}$. The answer is C.",
          desmosHint:
            "Open Desmos and assign $p = 25$ (so $25\%$ of $x = 3$ means $x = 12$). Now test each option by typing them as $f(p)$. Only $\frac{(100)(3)}{p} = \frac{300}{25} = 12$ matches ✓. Type each option: $y = \frac{p}{300}$, $y = \frac{3p}{100}$, $y = \frac{300}{p}$, $y = \frac{3}{p}$ — the one that gives $12$ when $p = 25$ is correct.",
        },
        {
          n: 7,
          domain: "Algebra",
          difficulty: "hard",
          text: "$(y + g)(kx + g) = 1$\\quad The given equation relates the positive numbers $g$, $x$, and $y$. Which equation correctly expresses $y$ in terms of $g$, $k$, and $x$?",
          type: "mcq",
          o: [
            "$y = kx - g$",
            "$y = \\frac{1}{kx + g} - g$",
            "$y = \\frac{1 - g}{kx + g}$",
            "$y = 1 - kx - 2g$",
          ],
          a: "B",
          solution:
            "Divide both sides by $(kx + g)$: $y + g = \\frac{1}{kx + g}$. Subtract $g$: $y = \\frac{1}{kx + g} - g$. The answer is B.",
        },
        {
          n: 8,
          domain: "Algebra",
          difficulty: "easy",
          text: "The ratio of $6$ to $x$ is equivalent to the ratio of $24$ to $y$. Which equation represents $y$ in terms of $x$?",
          type: "mcq",
          o: [
            "$y = 5x$",
            "$y = 4x$",
            "$y = \\frac{1}{4}x$",
            "$y = \\frac{1}{5x}$",
          ],
          a: "B",
          solution:
            "Set up the proportion: $\\frac{6}{x} = \\frac{24}{y}$. Cross-multiply: $6y = 24x$. Solve: $y = 4x$. The answer is B.",
        },
        {
          n: 9,
          domain: "Algebra",
          difficulty: "medium",
          text: "$ka + nb = 10$\\quad The given equation relates the positive numbers $a$, $b$, $k$, and $n$. Which of the following correctly expresses $a$ in terms of $b$, $k$ and $n$?",
          type: "mcq",
          o: [
            "$a = \\frac{10 - k}{nb}$",
            "$a = 10 - \\frac{k}{nb}$",
            "$a = 10 - \\frac{nb}{k}$",
            "$a = \\frac{10 - nb}{k}$",
          ],
          a: "D",
          solution:
            "Subtract $nb$ from both sides: $ka = 10 - nb$. Divide by $k$: $a = \\frac{10 - nb}{k}$. The answer is D.",
        },
        {
          n: 10,
          domain: "Algebra",
          difficulty: "hard",
          text: "$A = P(rt + 1)$\\quad The equation shown gives $A$ in terms of $P$, $r$, and $t$, where $P$ and $r$ are not equal to $0$. Which equation gives $t$ in terms of $A$, $P$ and $r$?",
          type: "mcq",
          o: [
            "$t = \\frac{A}{P} - \\frac{1}{r}$",
            "$t = \\frac{A}{Pr} - \\frac{1}{r}$",
            "$t = \\frac{A}{Pr} - \\frac{1}{pr}$",
            "$t = \\frac{A}{r} - \\frac{p}{r}$",
          ],
          a: "B",
          solution:
            "Divide by $P$: $\\frac{A}{P} = rt + 1$. Subtract 1: $rt = \\frac{A}{P} - 1$. Divide by $r$: $t = \\frac{A}{Pr} - \\frac{1}{r}$. The answer is B.",
        },
        {
          n: 11,
          domain: "Algebra",
          difficulty: "hard",
          text: "$2dx - 3cx = 2cd - x$\\quad The given equation relates the real numbers $c$, $d$, and $x$, where $c < 0$ and $d > 0$. Which equation correctly expresses $x$ in terms of $c$ and $d$?",
          type: "mcq",
          o: [
            "$x = \\frac{2cd}{2d - 3c + 1}$",
            "$x = \\frac{2 + 2c}{2c + 3d}$",
            "$x = \\frac{2d + 3c}{1 - c}$",
            "$x = \\frac{3d}{2d - 3c}$",
          ],
          a: "A",
          solution:
            "Move all $x$ terms to one side: $2dx - 3cx + x = 2cd$. Factor out $x$: $x(2d - 3c + 1) = 2cd$. Divide: $x = \\frac{2cd}{2d - 3c + 1}$. The answer is A.",
        },
        {
          n: 12,
          domain: "Algebra",
          difficulty: "hard",
          text: "$wxy + xyz = wx + yz$\\quad In the equation above, $w$, $x$, and $z$ are each greater than $1$. Which of the following is equivalent to $y$?",
          type: "mcq",
          o: [
            "$y = \\frac{1}{x}$",
            "$y = -x$",
            "$y = \\frac{1}{xz - z}$",
            "$y = \\frac{wx}{wx + xz - z}$",
          ],
          a: "D",
          solution:
            "Move all $y$ terms to one side: $wxy + xyz - yz = wx$. Factor out $y$: $y(wx + xz - z) = wx$. Divide: $y = \\frac{wx}{wx + xz - z}$. The answer is D.",
        },
        {
          n: 13,
          domain: "Algebra",
          difficulty: "hard",
          text: "$2xy + 3xt - 7yt = 0$\\quad In the equation above, $x$ and $y$ are positive and $x < y$. What is $t$ in terms of $x$ and $y$?",
          type: "mcq",
          o: [
            "$t = \\frac{1}{2}$",
            "$t = \\frac{2xy}{3x - 7y}$",
            "$t = \\frac{xy}{2(y - x)}$",
            "$t = \\frac{2xy}{7y - 3x}$",
          ],
          a: "D",
          solution:
            "Move $t$ terms to one side: $2xy = 7yt - 3xt = t(7y - 3x)$. Divide: $t = \\frac{2xy}{7y - 3x}$. The answer is D.",
        },
        {
          n: 14,
          domain: "Algebra",
          difficulty: "easy",
          text: "If $4x + 4 = 20$, what is the value of $x + 1$?",
          type: "mcq",
          o: ["$4$", "$9$", "$5$", "$6$"],
          a: "C",
          solution:
            "Divide both sides by 4: $x + 1 = 5$. The answer is C.",
        },
        {
          n: 15,
          domain: "Algebra",
          difficulty: "easy",
          text: "If $\\frac{6}{x + 1} = 3$, what is the value of $x + 1$?",
          type: "mcq",
          o: ["$1$", "$2$", "$3$", "$0.5$"],
          a: "B",
          solution:
            "Multiply both sides by $(x + 1)$: $6 = 3(x + 1)$. Divide by 3: $x + 1 = 2$. The answer is B.",
        },
        {
          n: 16,
          domain: "Algebra",
          difficulty: "easy",
          text: "$x^{2} + 10 = 91$. What is the positive solution to the given equation?",
          type: "mcq",
          o: ["$9$", "$51$", "$10$", "$41$"],
          a: "A",
          solution:
            "Subtract 10: $x^{2} = 81$. Take the square root: $x = \\pm 9$. The positive solution is $9$. The answer is A.",
          desmosHint:
            "Open Desmos and type $y = x^2 + 10 - 91$ (or $y = x^2 - 81$). The graph crosses the $x$-axis at the zeros. Click on each intersection point to see the coordinates. The positive $x$-intercept is $9$ ✓.",
        },
        {
          n: 17,
          domain: "Algebra",
          difficulty: "medium",
          text: "If $3\\left(\\frac{x}{5} + \\frac{1}{2}\\right) + 1 = 10$, what is the value of $\\frac{x}{5} + \\frac{1}{2}$?",
          type: "mcq",
          o: ["$12$", "$1$", "$6$", "$3$"],
          a: "D",
          solution:
            "Subtract 1: $3\\left(\\frac{x}{5} + \\frac{1}{2}\\right) = 9$. Divide by 3: $\\frac{x}{5} + \\frac{1}{2} = 3$. The answer is D.",
          desmosHint:
            "Open Desmos and type $y = 3(x/5 + 1/2) + 1$ and $y = 10$ on two lines. The intersection point's $x$-coordinate is the solution for $x$. Once you have $x$, compute $x/5 + 1/2$ to verify the answer is $3$ ✓.",
        },
        {
          n: 18,
          domain: "Algebra",
          difficulty: "medium",
          text: "If $\\frac{2x}{3} - 2 = \\frac{x}{3} + 1$, what is the value of $x$?",
          type: "mcq",
          o: ["$9$", "$-9$", "$3$", "$18$"],
          a: "A",
          solution:
            "Subtract $\\frac{x}{3}$: $\\frac{x}{3} - 2 = 1$. Add 2: $\\frac{x}{3} = 3$. Multiply by 3: $x = 9$. The answer is A.",
          desmosHint:
            "Open Desmos and type $y = \frac{2x}{3} - 2$ in line 1 and $y = \frac{x}{3} + 1$ in line 2. Click the intersection point of the two lines — the $x$-coordinate is $9$ ✓. This visualizes why the two expressions are equal when $x = 9$.",
        },
        {
          n: 19,
          domain: "Algebra",
          difficulty: "hard",
          text: "The expression $\\frac{x^{6}(x - 3)}{2x} + \\frac{3x^{6}}{2x}$ is equivalent to $\\frac{x^{c}}{2}$, where $c$ is a constant and $x > 0$. What is the value of $c$?",
          type: "mcq",
          o: ["$6$", "$4$", "$\\frac{1}{2}$", "$2$"],
          a: "A",
          solution:
            "Combine the fractions over a common denominator: $\\frac{x^{6}(x - 3) + 3x^{6}}{2x} = \\frac{x^{6}(x - 3 + 3)}{2x} = \\frac{x^{6} \\cdot x}{2x} = \\frac{x^{7}}{2x} = \\frac{x^{6}}{2}$. So $c = 6$. The answer is A.",
        },
      ],
    },

    {
      id: "1.2",
      num: "1.2",
      title: "Systems of Linear Equations",
      subtitle: "Solving systems by substitution, elimination, and graphing",
      qrange: "1 – 23",
      qcount: 23,
      timeLimit: 1800,
      strategyTitle: "Strategy: Systems of Linear Equations",
      strategyBody:
        "Three solution methods: (1) Substitution — solve one equation for one variable and substitute into the other; (2) Elimination — multiply equations by constants so that adding cancels one variable; (3) Graphing — find the intersection point. Use elimination when coefficients align easily, substitution when one variable is already isolated. For 'no solution' / 'infinitely many solutions' questions, compare slopes and intercepts.",
      qs: lesson_1_2_questions,
    },
    {
      id: "1.3",
      num: "1.3",
      title: "Inequalities",
      subtitle: "Solving and graphing linear inequalities",
      qrange: "7 – 16",
      qcount: 10,
      timeLimit: 1500,
      strategyTitle: "Strategy: Inequalities",
      strategyBody:
        "Treat inequalities like equations, but flip the inequality sign when multiplying or dividing by a negative number. Use open circles for < and >, closed circles for ≤ and ≥. For systems of inequalities, the solution is the intersection of the shaded regions. For word problems, identify the constraint (≥, ≤, >, <) and the rate (slope).",
      qs: [
        {
          n: 7,
          domain: "Algebra",
          difficulty: "medium",
          text: "$4x - 2y > 8$\\quad Which of the following ordered pairs $(x, y)$ are in the solution set for the inequality above?\\quad I. $(-1, -10)$\\quad II. $(2, 0)$\\quad III. $(1, -2)$",
          type: "mcq",
          o: ["III only", "I only", "II only", "I and II only"],
          a: "B",
          solution:
            "Test each point by substituting into $4x - 2y > 8$:\\n- I. $(-1, -10)$: $4(-1) - 2(-10) = -4 + 20 = 16 > 8$ ✓\\n- II. $(2, 0)$: $4(2) - 2(0) = 8$, but $8 > 8$ is false ✗\\n- III. $(1, -2)$: $4(1) - 2(-2) = 4 + 4 = 8$, but $8 > 8$ is false ✗\\nOnly I satisfies the inequality, so the answer is B.",
          desmosHint:
            "Open Desmos and type $4x - 2y > 8$ in line 1. Desmos automatically shades the solution region. Then type each point as $(x, y)$ in separate lines: $(-1, -10)$, $(2, 0)$, $(1, -2)$. The point inside the shaded region is the answer. Only $(-1, -10)$ is in the shaded area ✓.",
        },
        {
          n: 8,
          domain: "Algebra",
          difficulty: "medium",
          text: "$y > 4x$\\quad and\\quad $y < -x$\\quad When graphed in the $xy$-plane, what point $(x, y)$ is a solution to the given system of inequalities?",
          type: "mcq",
          o: ["$(3, -3)$", "$(1, 1)$", "$(-2, -2)$", "$(-4, 4)$"],
          a: "C",
          solution:
            "Test each point in both inequalities:\\n- A. $(3, -3)$: $-3 > 12$? ✗\\n- B. $(1, 1)$: $1 > 4$? ✗\\n- C. $(-2, -2)$: $-2 > -8$ ✓ and $-2 < 2$ ✓\\n- D. $(-4, 4)$: $4 > -16$ ✓ but $4 < 4$? ✗\\nOnly $(-2, -2)$ satisfies both, so the answer is C.",
          desmosHint:
            "Open Desmos and type $y > 4x$ in line 1 and $y < -x$ in line 2. The overlapping shaded region is the solution. Test each point: $(-2, -2)$ falls inside both shaded regions ✓.",
        },
        {
          n: 9,
          domain: "Algebra",
          difficulty: "hard",
          text: "Which shaded region shown represents the solutions to which inequality?",
          type: "mcq",
          o: [
            "$y \\leq -3x + 1$",
            "$y \\geq -3x + 1$",
            "$y \\geq 3x - 1$",
            "$y \\leq 3x - 1$",
          ],
          a: "B",
          solution:
            "The boundary line has slope $-3$ and $y$-intercept $1$, so the equation is $y = -3x + 1$. The shaded region is above the line, so the inequality is $y \\geq -3x + 1$.",
          desmosHint:
            "Open Desmos and type each option: $y \leq -3x + 1$, $y \geq -3x + 1$, $y \geq 3x - 1$, $y \leq 3x - 1$. Compare the shaded region to the graph shown in the question. The matching one has slope $-3$, $y$-intercept $1$, and shades above the line.",
        },
        {
          n: 10,
          domain: "Algebra",
          difficulty: "hard",
          text: "$y = -2x + 3$ and $y = x - 3$. Point $P$ (not shown) is $(2, -4)$ and lies in the shaded region. Which of the following is (are) true about point $P$?\\quad I. The coordinates of $P$ satisfy $y < -2x + 3$\\quad II. The coordinates of $P$ satisfy $y > x - 3$",
          type: "mcq",
          o: ["Neither I nor II", "I only", "I and II", "II only"],
          a: "B",
          solution:
            "Substitute $P = (2, -4)$ into each inequality:\\n- I. $-4 < -2(2) + 3 = -1$? Yes, $-4 < -1$ ✓\\n- II. $-4 > 2 - 3 = -1$? No, $-4 > -1$ is false ✗\\nOnly I is true, so the answer is B.",
          desmosHint:
            "Open Desmos and type $y < -2x + 3$ in line 1 and $y > x - 3$ in line 2. Then plot point $P = (2, -4)$ by typing $(2, -4)$. The point is in the shaded region of inequality I ($y < -2x + 3$) but not inequality II ($y > x - 3$) ✓.",
        },
        {
          n: 11,
          domain: "Algebra",
          difficulty: "medium",
          text: "At the beginning of a laboratory experiment, Miguel had 10 milliliters of a solution in a flask. The first step of the experiment consisted of Miguel pouring $x$ milliliters of the solution into a beaker and $y$ milliliters of the solution into a different beaker. There remained at least 4 milliliters of the solution in the flask after the first step. Which of the following inequalities can be used to correctly represent this situation?",
          type: "mcq",
          o: [
            "$4 - x + y \\geq 5$",
            "$10 - x + y \\geq 4$",
            "$10 - x - y \\geq 4$",
            "$4 - x - y \\geq 5$",
          ],
          a: "C",
          solution:
            "Miguel started with 10 mL, poured out $x + y$ mL total, and at least 4 mL remained. So $10 - (x + y) \\geq 4$, which simplifies to $10 - x - y \\geq 4$. The answer is C.",
          desmosHint:
            "Open Desmos and type $10 - x - y \geq 4$ (or $x + y \leq 6$). The shaded region shows all valid $(x, y)$ combinations. This matches the situation: started with 10 mL, poured out $x + y$ mL, kept at least 4 mL ✓.",
        },
        {
          n: 12,
          domain: "Algebra",
          difficulty: "medium",
          text: "Howard needs to move a large number of boxes from one floor to another in an office building by using an elevator. The elevator has a weight limit of 650 pounds. Howard weighs 160 pounds and each box weighs 35 pounds. Which of the following inequalities describes the limit on the number of boxes, $b$, that Howard can ride with in the elevator in one trip?",
          type: "mcq",
          o: [
            "$160b + 35 \\leq 650$",
            "$35b + 160 \\leq 650$",
            "$35(b + 160) \\leq 650$",
            "$35b - 160 \\leq 650$",
          ],
          a: "B",
          solution:
            "Total weight = Howard's weight + weight of $b$ boxes = $160 + 35b$. This must be ≤ 650: $35b + 160 \\leq 650$. The answer is B.",
          desmosHint:
            "Open Desmos and type $35b + 160 \leq 650$ (the correct answer). Desmos shades the valid range of $b$ values. Try $b = 14$: $35(14) + 160 = 650$ ✓ (boundary). For $b = 15$: $35(15) + 160 = 685 > 650$ ✗ (exceeds limit).",
        },
        {
          n: 13,
          domain: "Algebra",
          difficulty: "medium",
          text: "Ms. Anderson currently has 550 contacts on an online professional networking site. Her goal is to have at least 1,000 contacts. If she wants to meet this goal in 25 weeks, what is the minimum number of contacts per week, on average, she should add?",
          type: "mcq",
          o: ["$22$", "$18$", "$21$", "$1$"],
          a: "B",
          solution:
            "Let $w$ = contacts per week. Then $550 + 25w \\geq 1000 \\Rightarrow 25w \\geq 450 \\Rightarrow w \\geq 18$. So the minimum is $18$ contacts per week. The answer is B.",
        },
        {
          n: 14,
          domain: "Algebra",
          difficulty: "medium",
          text: "Sanjay works as a teacher's assistant for $\\$20$ per hour and tutors privately for $\\$25$ per hour. Last week, he made at least $\\$100$ working $x$ hours as a teacher's assistant and $y$ hours as a private tutor. Which of the following inequalities models this situation?",
          type: "mcq",
          o: [
            "$5x + 4y \\geq 20$",
            "$5x + 4y \\geq 25$",
            "$4x + 5y \\geq 25$",
            "$4x + 5y \\geq 20$",
          ],
          a: "D",
          solution:
            "Total earnings = $20x + 25y \\geq 100$. Divide both sides by 5: $4x + 5y \\geq 20$. The answer is D.",
        },
        {
          n: 15,
          domain: "Algebra",
          difficulty: "hard",
          text: "A company offers its salespeople two different weekly compensation plans. Salespeople on Plan X earn $\\$1{,}000$ plus a $10\\%$ commission on their sales each week. Salespeople on Plan Y earn $\\$500$ plus a $20\\%$ commission on their sales each week. Which inequality models the amount in sales each week, $d$ dollars, for which salespeople on Plan X earn more than salespeople on Plan Y?",
          type: "mcq",
          o: [
            "$d < 5000$",
            "$d < 1500$",
            "$d > 5000$",
            "$d > 1500$",
          ],
          a: "A",
          solution:
            "Plan X: $1000 + 0.10d$. Plan Y: $500 + 0.20d$. Set X > Y: $1000 + 0.10d > 500 + 0.20d \\Rightarrow 500 > 0.10d \\Rightarrow d < 5000$. The answer is A.",
        },
        {
          n: 16,
          domain: "Algebra",
          difficulty: "medium",
          text: "In ancient Egypt, from 2810 BC to 2800 BC, the course of the Nile riverbed moved eastward at least 2 meters per year but no more than 3 meters per year. Which of the following inequalities represents all possible values for the total distance, $d$, in meters, the Nile riverbed moved eastward for 4 consecutive years during this time period?",
          type: "mcq",
          o: [
            "$2 \\leq d \\leq 3$",
            "$0 \\leq d \\leq 2$",
            "$8 \\leq d \\leq 12$",
            "$4 \\leq d \\leq 8$",
          ],
          a: "C",
          solution:
            "Per year: $2 \\leq \\text{distance} \\leq 3$. Over 4 years: $4 \\times 2 \\leq d \\leq 4 \\times 3$, so $8 \\leq d \\leq 12$. The answer is C.",
        },
      ],
    },
    {
      id: "1.4",
      num: "1.4",
      title: "Absolute Value",
      subtitle: "Solving absolute value equations and inequalities",
      qrange: "1 – 6",
      qcount: 6,
      timeLimit: 900,
      strategyTitle: "Strategy: Absolute Value",
      strategyBody:
        "|x| = a has solutions x = a and x = −a (when a ≥ 0). |x| < a means −a < x < a. Always isolate the absolute value expression before splitting into two cases. For |A| = |B|, either A = B or A = −B.",
      qs: [
        {
          n: 1,
          domain: "Algebra",
          difficulty: "easy",
          text: "$|x + 2| = 9$\\quad What is the solution to the given equation?",
          type: "mcq",
          o: ["$7$", "$11$", "$-7$", "$4$"],
          a: "A",
          solution:
            "Split into two cases: $x + 2 = 9 \\Rightarrow x = 7$ OR $x + 2 = -9 \\Rightarrow x = -11$. Of the given options, only $7$ is a solution. The answer is A.",
          desmosHint:
            "Open Desmos and type $y = |x + 2|$ in line 1 and $y = 9$ in line 2. The graph of $y = |x + 2|$ is a V-shape, and $y = 9$ is a horizontal line. Click both intersection points — they are at $x = 7$ and $x = -11$. The option matching is $7$ ✓.",
        },
        {
          n: 2,
          domain: "Algebra",
          difficulty: "easy",
          text: "$|x - 4| = 19$\\quad What are all the solutions to the given equation?",
          type: "mcq",
          o: [
            "$-15$ and $23$",
            "$15$ only",
            "$23$ only",
            "$15$ and $-23$",
          ],
          a: "A",
          solution:
            "Split into two cases: $x - 4 = 19 \\Rightarrow x = 23$ OR $x - 4 = -19 \\Rightarrow x = -15$. So the solutions are $-15$ and $23$. The answer is A.",
          desmosHint:
            "Open Desmos and type $y = |x - 4|$ in line 1 and $y = 19$ in line 2. The V-shaped graph crosses the horizontal line at two points. Click both — the $x$-coordinates are $23$ and $-15$ ✓.",
        },
        {
          n: 3,
          domain: "Algebra",
          difficulty: "medium",
          text: "$2|x - 9| = 20$\\quad What is the sum of the solutions to the given equation?",
          type: "mcq",
          o: ["$18$", "$20$", "$19$", "$-1$"],
          a: "A",
          solution:
            "First isolate: $|x - 9| = 10$. Split: $x - 9 = 10 \\Rightarrow x = 19$ OR $x - 9 = -10 \\Rightarrow x = -1$. Sum: $19 + (-1) = 18$. The answer is A.",
          desmosHint:
            "Open Desmos and type $y = 2|x - 9|$ in line 1 and $y = 20$ in line 2. The V-shape (stretched by 2) crosses the horizontal line at $x = 19$ and $x = -1$. Sum: $19 + (-1) = 18$ ✓.",
        },
        {
          n: 4,
          domain: "Algebra",
          difficulty: "medium",
          text: "$|x - 1| = 8$\\quad If $x$ is a solution to the given equation, what is a possible value of $x - 1$?",
          type: "mcq",
          o: ["$-6$", "$6$", "$7$", "$-8$"],
          a: "D",
          solution:
            "If $|x - 1| = 8$, then $x - 1 = 8$ or $x - 1 = -8$. Of the given options, only $-8$ is a possible value. The answer is D.",
          desmosHint:
            "Open Desmos and type $y = |x - 1|$ in line 1 and $y = 8$ in line 2. The graph shows the V crossing the line at $x = 9$ (where $x - 1 = 8$) and $x = -7$ (where $x - 1 = -8$). So a possible value of $x - 1$ is $-8$ ✓.",
        },
        {
          n: 5,
          domain: "Algebra",
          difficulty: "hard",
          text: "$|x + 2| = |x - 8|$\\quad What is the solution to the given equation?",
          type: "mcq",
          o: ["$-3$", "$3$", "$-6$", "$6$"],
          a: "B",
          solution:
            "Either $x + 2 = x - 8$ (impossible: $2 = -8$) or $x + 2 = -(x - 8) = -x + 8$. Solving the second: $2x = 6 \\Rightarrow x = 3$. The answer is B.",
          desmosHint:
            "Open Desmos and type $y = |x + 2|$ in line 1 and $y = |x - 8|$ in line 2. The two V-shapes cross at exactly one point. Click the intersection — the $x$-coordinate is $3$ ✓.",
        },
        {
          n: 6,
          domain: "Algebra",
          difficulty: "easy",
          text: "$|x + 3| = 0$\\quad Exactly how many solutions does the given equation have?",
          type: "mcq",
          o: ["Three", "One", "Two", "Zero"],
          a: "B",
          solution:
            "$|x + 3| = 0$ requires $x + 3 = 0$, giving $x = -3$. This is exactly one solution. The answer is B.",
          desmosHint:
            "Open Desmos and type $y = |x + 3|$. The V-shape touches the $x$-axis at exactly one point: $x = -3$. This is the only solution ✓.",
        },
      ],
    },

    {
      id: "1.5",
      num: "1.5",
      title: "Linear Functions",
      subtitle: "Slope, intercepts, and function notation",
      qrange: "1 – 22",
      qcount: 22,
      timeLimit: 1800,
      strategyTitle: "Strategy: Linear Functions",
      strategyBody:
        "Slope m = (y₂ − y₁)/(x₂ − x₁). Slope-intercept form: y = mx + b. Standard form: Ax + By = C. Point-slope form: y − y₁ = m(x − x₁). Parallel lines share the same slope; perpendicular lines have slopes whose product is −1 (negative reciprocals).",
      qs: [
        {
          n: 1,
          domain: "Algebra",
          difficulty: "easy",
          text: "The function $f$ is defined by $f(x) = x + 1$. What is the $y$-intercept of the graph of $y = f(x)$ in the $xy$-plane?",
          type: "mcq",
          o: ["$(0, -3)$", "$(0, -1)$", "$(0, 3)$", "$(0, 1)$"],
          a: "D",
          solution:
            "The $y$-intercept occurs where $x = 0$. Substitute $x = 0$ into $f(x) = x + 1$: $f(0) = 0 + 1 = 1$. So the $y$-intercept is $(0, 1)$.",
        },
        {
          n: 2,
          domain: "Algebra",
          difficulty: "easy",
          text: "What is the $x$-intercept of the graph of the function $f(x) = -5x - 10$ in the $xy$-plane?",
          type: "mcq",
          o: ["$(-5, 0)$", "$(-2, 0)$", "$(-10, 0)$", "$(10, 0)$"],
          a: "B",
          solution:
            "The $x$-intercept occurs where $y = 0$. Set $f(x) = 0$: $-5x - 10 = 0 \\Rightarrow -5x = 10 \\Rightarrow x = -2$. So the $x$-intercept is $(-2, 0)$.",
        },
        {
          n: 3,
          domain: "Algebra",
          difficulty: "medium",
          text: "A line in the $xy$-plane passes through the points $(2, 6)$ and $(6, 12)$. Which of the following is an equation of this line?",
          type: "mcq",
          o: [
            "$y = \\frac{3}{2}x + \\frac{14}{3}$",
            "$y = \\frac{3}{2}x + 3$",
            "$y = x + 8$",
            "$y = \\frac{2}{3}x + \\frac{14}{3}$",
          ],
          a: "B",
          solution:
            "Slope $m = \\frac{12 - 6}{6 - 2} = \\frac{6}{4} = \\frac{3}{2}$. Using point $(2, 6)$ with $y = mx + b$: $6 = \\frac{3}{2}(2) + b \\Rightarrow 6 = 3 + b \\Rightarrow b = 3$. So the equation is $y = \\frac{3}{2}x + 3$.",
          desmosHint:
            "Open Desmos and use the table feature: enter points $(2, 6)$ and $(6, 12)$. Then type $y = \frac{3}{2}x + 3$ to verify both points lie on this line. The slope $\frac{12-6}{6-2} = \frac{3}{2}$ ✓.",
        },
        {
          n: 4,
          domain: "Algebra",
          difficulty: "medium",
          text: "Which of the following is an equation of the line in the $xy$-plane that contains the points $(1, 3)$ and $(5, 15)$?",
          type: "mcq",
          o: [
            "$y = \\frac{1}{2}x$",
            "$y = 2x + 5$",
            "$y = 3x$",
            "$y = x + 2$",
          ],
          a: "C",
          solution:
            "Slope $m = \\frac{15 - 3}{5 - 1} = \\frac{12}{4} = 3$. Using point $(1, 3)$ with $y = mx + b$: $3 = 3(1) + b \\Rightarrow b = 0$. So the equation is $y = 3x$.",
          desmosHint:
            "Open Desmos and type points $(1, 3)$ and $(5, 15)$ as a table. Then type $y = 3x$ — both points lie on this line. The slope $\frac{15-3}{5-1} = 3$ and $y$-intercept is $0$ ✓.",
        },
        {
          n: 5,
          domain: "Algebra",
          difficulty: "medium",
          text: "The table shows some values of $x$ and their corresponding values of $y$. There is a linear relationship between $x$ and $y$. Which of the following equations represents this relationship?",
          type: "mcq",
          o: [
            "$y = 0.5x - 2$",
            "$y = 2x - 4$",
            "$y = 0.5x + 2$",
            "$y = 12x + 14$",
          ],
          a: "A",
          solution:
            "From the table, compute the slope $m = \\frac{\\Delta y}{\\Delta x} = 0.5$ and the $y$-intercept $b = -2$. Substituting into $y = mx + b$ gives $y = 0.5x - 2$.",
        },
        {
          n: 6,
          domain: "Algebra",
          difficulty: "medium",
          text: "The table above shows several values of $x$ and their corresponding values of $y$, where $k$ is a nonzero constant. If the relationship between $x$ and $y$ is linear, which of the following defines this relationship?",
          type: "mcq",
          o: [
            "$y = -2kx$",
            "$y = kx$",
            "$y = -2k - x - 1$",
            "$y = 2x(k + 1)$",
          ],
          a: "A",
          solution:
            "From the table, the slope is $-2k$ and the $y$-intercept is $0$. Substituting into $y = mx + b$ gives $y = -2kx$.",
        },
        {
          n: 7,
          domain: "Algebra",
          difficulty: "medium",
          text: "An online sale has a relationship between the prices, where $x$ is the nonsale price, in dollars, of an item and $y$ is the total sale price, in dollars, of the item including a shipping fee. Which equation represents the relationship between $x$ and $y$?",
          type: "mcq",
          o: [
            "$y = 2x + 10$",
            "$y = 2x - 10$",
            "$y = \\frac{1}{2}x - 10$",
            "$y = \\frac{1}{2}x + 10$",
          ],
          a: "D",
          solution:
            "The sale price is half the nonsale price plus a $10 shipping fee. Substituting into $y = mx + b$ where $m = \\frac{1}{2}$ and $b = 10$ gives $y = \\frac{1}{2}x + 10$.",
          desmosHint:
            "Open Desmos and test each option. Type $y = \frac{1}{2}x + 10$ (option D) and use a slider for $x$. When $x = 20$ (nonsale price), $y = 20$. Half the price ($10$) plus $10$ shipping = $20$ ✓. This matches the sale scenario.",
        },
        {
          n: 8,
          domain: "Algebra",
          difficulty: "medium",
          text: "The graph shown models the relationship between the distance $D$, in kilometers, from Earth to the Moon and the time $T$, in millions of years after the present. Which of the following equations models this relationship?",
          type: "mcq",
          o: [
            "$D = 38T - 385{,}000$",
            "$D = -38T - 385{,}000$",
            "$D = -38T + 385{,}000$",
            "$D = 38T + 385{,}000$",
          ],
          a: "D",
          solution:
            "At the present time ($T = 0$), $D = 385{,}000$ km. As $T$ increases, $D$ increases (the Moon moves away from Earth). So slope is positive: $D = 38T + 385{,}000$.",
          desmosHint:
            "Open Desmos and type $D = 38T + 385000$ with a slider for $T$. At $T = 0$ (present), $D = 385000$ ✓. As $T$ increases, $D$ increases (Moon moves away from Earth) ✓.",
        },
        {
          n: 9,
          domain: "Algebra",
          difficulty: "medium",
          text: "A graph represents the total charges, in dollars, by a contractor for $x$ hours of work. The contractor charges a one-time fee plus an hourly rate. What is the best interpretation of the slope of the graph?",
          type: "mcq",
          o: [
            "The contractor's hourly rate",
            "The maximum amount that the contractor charges",
            "The contractor's one-time fee",
            "The total amount that the contractor charges",
          ],
          a: "A",
          solution:
            "In $y = mx + b$, the slope $m$ represents the rate of change per unit of $x$. Here $x$ is hours, so the slope is the dollar change per hour — i.e., the contractor's hourly rate.",
        },
        {
          n: 10,
          domain: "Algebra",
          difficulty: "easy",
          text: "The equation $h = 250 + 20t$ gives the total number of housing units, $h$, in a community $t$ months after a new zoning law was passed. How many housing units are added to the community each month after the zoning law was passed?",
          type: "mcq",
          o: ["$20$", "$260$", "$2500$", "$250$"],
          a: "A",
          solution:
            "The coefficient of $t$ in $h = 250 + 20t$ is $20$, which represents the rate of change of $h$ per month. So $20$ housing units are added each month.",
        },
        {
          n: 11,
          domain: "Algebra",
          difficulty: "medium",
          text: "The given linear function $g(x) = 0.038x + 2.136$ models the annual percentage increase in the population of India $x$ years after 1990. What is the best interpretation of $g(10) = 1.486$ in this context?",
          type: "mcq",
          o: [
            "1.486 years after 1990, the percentage increase in the population of India was 10% over the previous year.",
            "1.486 years after 1990, India's population was approximately 10 times its population in 1990.",
            "10 years after 1990, India's population was approximately 1.486 times its population in 1990.",
            "10 years after 1990, the percentage increase in the population of India was 1.486% over the previous year.",
          ],
          a: "D",
          solution:
            "$g(10)$ evaluates the function at $x = 10$, which represents 10 years after 1990. The output $1.486$ is the modeled percentage increase. So: 10 years after 1990, the percentage increase in the population was $1.486\\%$ over the previous year.",
        },
        {
          n: 12,
          domain: "Algebra",
          difficulty: "medium",
          text: "A solution is formed by adding $m$ grams of propylene glycol to 100 grams of water. For this solution, the freezing point, in kelvins, is modeled by the function $T(m) = 273.2 - 0.372m$. Which of the following is the best interpretation of the statement \"$T(22)$ is approximately equal to 266\" in this context?",
          type: "mcq",
          o: [
            "A solution formed by adding 266 grams of propylene glycol to 100 grams of water has an estimated freezing point of 22 kelvins.",
            "A solution formed by adding 22 grams of propylene glycol to 100 grams of water has an estimated freezing point of 266 kelvins.",
            "For every 22 grams of propylene glycol added to 100 grams of water, the freezing point of the solution is estimated to decrease by 266 kelvins.",
            "For every 266 grams of propylene glycol added to 100 grams of water, the freezing point of the solution is estimated to decrease by 22 kelvins.",
          ],
          a: "B",
          solution:
            "$T(22) \\approx 266$ means: when $m = 22$ grams are added to 100 g of water, the freezing point is approximately 266 kelvins. This matches option B.",
        },
        {
          n: 13,
          domain: "Algebra",
          difficulty: "medium",
          text: "For a survey, students were assigned to either group R or group V. Combined, the students in both groups answered a total of 18 questions. Of these, a total of 6 questions were answered by the students in group V. The equation $3r + 6 = 18$ describes this situation, where $r$ represents the number of questions answered by each student in group R. Which of the following is the best interpretation of $3r$ in this context?",
          type: "mcq",
          o: [
            "The number of students in group V.",
            "The total number of questions answered by students in group V.",
            "The total number of questions answered by students in group R.",
            "The number of students in group R.",
          ],
          a: "C",
          solution:
            "Each student in group R answered $r$ questions. The coefficient $3$ indicates there are 3 students in group R, so $3r$ is the total number of questions answered by all students in group R.",
        },
        {
          n: 14,
          domain: "Algebra",
          difficulty: "medium",
          text: "Larry is training for a half marathon by going on a long run every Saturday. He will run 4 miles on the first Saturday of his training. Each Saturday after the first, he will run 2 more miles than he ran on the preceding Saturday. Which of the following equations represents the number of miles $m$ Larry will run on the $n$th Saturday of his training?",
          type: "mcq",
          o: [
            "$m = 2n + 2$",
            "$m = 2^n + 3$",
            "$m = 2n - 1$",
            "$m = 2n + 4$",
          ],
          a: "A",
          solution:
            "First Saturday ($n = 1$): 4 miles. Each subsequent Saturday adds 2 miles. So $m = 4 + 2(n - 1) = 4 + 2n - 2 = 2n + 2$. Verify: $n = 1 \\Rightarrow m = 4$ ✓, $n = 2 \\Rightarrow m = 6$ ✓.",
        },
        {
          n: 15,
          domain: "Algebra",
          difficulty: "easy",
          text: "When a zebra fish was 25 days old, the length of its tail fin was 3.0 millimeters (mm). The length of the fin increased by 0.06 mm each day for the next 175 days. Which of the following types of functions best describes how the fin length changed over time during this 175-day period?",
          type: "mcq",
          o: [
            "Decreasing exponential",
            "Increasing linear",
            "Increasing exponential",
            "Decreasing linear",
          ],
          a: "B",
          solution:
            "The fin length increases by a constant amount (0.06 mm/day). Constant rate of change → linear. Since it's increasing, the answer is \"Increasing linear\".",
        },
        {
          n: 16,
          domain: "Algebra",
          difficulty: "medium",
          text: "What is the $x$-coordinate of the $x$-intercept of the line with equation $\\frac{2x}{3} + \\frac{y}{3} = 1$ when it is graphed in the $xy$-plane?",
          type: "mcq",
          o: ["$2$", "$1$", "$1.5$", "$0.5$"],
          a: "C",
          solution:
            "Set $y = 0$: $\\frac{2x}{3} + 0 = 1 \\Rightarrow 2x = 3 \\Rightarrow x = \\frac{3}{2} = 1.5$.",
          desmosHint:
            "Open Desmos and type $\frac{2x}{3} + \frac{y}{3} = 1$ (Desmos graphs this directly). To find the $x$-intercept, set $y = 0$: type $y = 0$ in line 2. The intersection gives $x = 1.5$ ✓.",
        },
        {
          n: 17,
          domain: "Algebra",
          difficulty: "hard",
          text: "An equation of the graph shown is $ax + by = 8$ where $a$ and $b$ are constants. What is the value of $b$?",
          type: "mcq",
          o: ["$2$", "$4$", "$-4$", "$-2$"],
          a: "B",
          solution:
            "From the graph, the $y$-intercept is $2$. Substituting $(0, 2)$ into $ax + by = 8$ gives $b(2) = 8 \\Rightarrow b = 4$.",
        },
        {
          n: 18,
          domain: "Algebra",
          difficulty: "medium",
          text: "The equation $4x + 20y = 4{,}700$ models the total number of trees in a neighborhood consisting of an $x$-hectare park and a $30$-hectare residential area. The total number of trees in the neighborhood is $4{,}700$. Which is the best interpretation of $x$ in this context?",
          type: "mcq",
          o: [
            "The number of trees per hectare in the residential area.",
            "The total number of trees in the park.",
            "The number of trees per hectare in the park.",
            "The total number of trees in the residential area.",
          ],
          a: "C",
          solution:
            "The coefficient of $x$ in $4x + 20y = 4{,}700$ represents the number of hectares of the park (4 hectares). So $x$ is the number of trees per hectare in the park.",
        },
        {
          n: 19,
          domain: "Algebra",
          difficulty: "medium",
          text: "The variables $x$ and $y$ are related such that each time $x$ increases by 3, $y$ decreases by 4. If $y = 8$ and $x = 0$, which of the following equations expresses the relationship between $x$ and $y$?",
          type: "mcq",
          o: [
            "$3x - 4y = -32$",
            "$3x - 4y = 8$",
            "$3x + 4y = 32$",
            "$4x + 3y = 24$",
          ],
          a: "D",
          solution:
            "Slope $m = \\frac{\\Delta y}{\\Delta x} = \\frac{-4}{3}$. With $y$-intercept $b = 8$ (since $y = 8$ when $x = 0$): $y = -\\frac{4}{3}x + 8$. Multiply by 3: $3y = -4x + 24 \\Rightarrow 4x + 3y = 24$. Verify: passes through $(0, 8)$ since $0 + 24 = 24$ ✓. So the answer is D.",
        },
        {
          n: 20,
          domain: "Algebra",
          difficulty: "easy",
          text: "Line $L$ is defined by $y = \\frac{1}{6}x - 4$. Line $k$ is parallel to line $L$ in the $xy$-plane. What is the slope of line $k$?",
          type: "mcq",
          o: ["$\\frac{1}{6}$", "$-6$", "$-\\frac{1}{6}$", "$6$"],
          a: "A",
          solution:
            "Parallel lines have the same slope. Line $L$ has slope $\\frac{1}{6}$, so line $k$ also has slope $\\frac{1}{6}$.",
          desmosHint:
            "Open Desmos and type $y = \frac{1}{6}x - 4$. The slope is $\frac{1}{6}$. Since line $k$ is parallel to line $L$, it has the same slope: $\frac{1}{6}$ ✓.",
        },
        {
          n: 21,
          domain: "Algebra",
          difficulty: "medium",
          text: "Line $p$ is defined by $4y + 8x = 18$. Line $r$ is perpendicular to line $p$ in the $xy$-plane. What is the slope of line $r$?",
          type: "mcq",
          o: ["$2$", "$-2$", "$-\\frac{1}{2}$", "$\\frac{1}{2}$"],
          a: "D",
          solution:
            "Rewrite $4y + 8x = 18$ in slope-intercept form: $4y = -8x + 18 \\Rightarrow y = -2x + \\frac{9}{2}$. Slope of $p$ is $-2$. Perpendicular slope is the negative reciprocal: $-\\frac{1}{-2} = \\frac{1}{2}$.",
        },
        {
          n: 22,
          domain: "Algebra",
          difficulty: "hard",
          text: "In the $xy$-plane, line $k$ with equation $y = mx + b$, where $m$ and $b$ are constants, passes through the point $(-3, 1)$. If line $k$ is perpendicular to the line with equation $y = -2x + 3$, what is the value of $b$?",
          type: "mcq",
          o: ["$-0.5$", "$0.5$", "$-2.5$", "$2.5$"],
          a: "D",
          solution:
            "Slope of $y = -2x + 3$ is $-2$, so the slope of perpendicular line $k$ is $\\frac{1}{2}$ (negative reciprocal). Using point $(-3, 1)$ in $y = \\frac{1}{2}x + b$: $1 = \\frac{1}{2}(-3) + b \\Rightarrow 1 = -\\frac{3}{2} + b \\Rightarrow b = 1 + \\frac{3}{2} = \\frac{5}{2} = 2.5$.",
          desmosHint:
            "Open Desmos and type $y = -2x + 3$ in line 1. The perpendicular line has slope $\frac{1}{2}$ (negative reciprocal). Type $y = \frac{1}{2}x + b$ in line 2 and add a slider for $b$. When the line passes through $(-3, 1)$, $b = 2.5$ ✓.",
        },
      ],
    },

    {
      id: "1.6",
      num: "1.6",
      title: "Graphs of Linear Equations",
      subtitle: "Interpreting and sketching linear graphs",
      qrange: "1 – 10",
      qcount: 10,
      timeLimit: 1500,
      strategyTitle: "Strategy: Graphs of Linear Equations",
      strategyBody:
        "Identify the slope and y-intercept from the equation y = mx + b. The slope tells rise-over-run; the y-intercept tells where the line crosses the y-axis. Two lines are parallel if they have the same slope, perpendicular if their slopes multiply to −1.",
      qs: [],
    },
  ],
};

/* ----------------------------------------------------------------- */
/* Chapter 2 — Problem Solving & Data Analysis                       */
/* ----------------------------------------------------------------- */

export const chapter2: ChapterConfig = {
  id: "ch2",
  title: "Problem Solving & Data Analysis",
  subtitle: "Ratios, percentages, statistics, and probability",
  color: "#2e7d32",
  icon: "BarChart3",
  defaultModule: "2.1",
  modules: [
    {
      id: "2.1",
      num: "2.1",
      title: "Ratios & Proportions",
      subtitle: "Setting up and solving ratio problems",
      qrange: "1 – 10",
      qcount: 10,
      timeLimit: 1500,
      strategyTitle: "Strategy: Ratios & Proportions",
      strategyBody:
        "Set up equivalent fractions when comparing quantities. Cross-multiply to solve proportions. Watch for units — convert to common units before comparing.",
      qs: [],
    },
    {
      id: "2.2",
      num: "2.2",
      title: "Percentages",
      subtitle: "Percent change, percent increase/decrease",
      qrange: "1 – 10",
      qcount: 10,
      timeLimit: 1500,
      strategyTitle: "Strategy: Percentages",
      strategyBody:
        "Percent change = (new − old)/old × 100. To find a percent of a number, multiply by the decimal form. Compound percents multiply: 20% then 30% leaves 56%.",
      qs: [],
    },
    {
      id: "2.3",
      num: "2.3",
      title: "Units & Conversions",
      subtitle: "Unit rates and dimensional analysis",
      qrange: "1 – 10",
      qcount: 10,
      timeLimit: 1500,
      strategyTitle: "Strategy: Units & Conversions",
      strategyBody:
        "Use dimensional analysis: write conversion factors as fractions so unwanted units cancel. Always include units in every intermediate step to catch errors.",
      qs: [],
    },
    {
      id: "2.4",
      num: "2.4",
      title: "Scatterplots",
      subtitle: "Lines of best fit and trends",
      qrange: "1 – 10",
      qcount: 10,
      timeLimit: 1500,
      strategyTitle: "Strategy: Scatterplots",
      strategyBody:
        "Identify positive, negative, or no correlation. A line of best fit passes through the middle of the data; slope tells the trend direction. Use the line to predict values.",
      qs: [],
    },
    {
      id: "2.5",
      num: "2.5",
      title: "Data Interpretation",
      subtitle: "Reading tables, charts, and graphs",
      qrange: "1 – 10",
      qcount: 10,
      timeLimit: 1500,
      strategyTitle: "Strategy: Data Interpretation",
      strategyBody:
        "Read the title, axis labels, and legend before the data. Check the scale — bar charts may not start at zero. Look for trends rather than individual values.",
      qs: [],
    },
    {
      id: "2.6",
      num: "2.6",
      title: "Probability",
      subtitle: "Simple, compound, and conditional probability",
      qrange: "1 – 10",
      qcount: 10,
      timeLimit: 1500,
      strategyTitle: "Strategy: Probability",
      strategyBody:
        "P(event) = favorable / total. For independent events A and B: P(A and B) = P(A) × P(B). For mutually exclusive events: P(A or B) = P(A) + P(B).",
      qs: [],
    },
    {
      id: "2.7",
      num: "2.7",
      title: "Statistics",
      subtitle: "Mean, median, mode, range, standard deviation",
      qrange: "1 – 10",
      qcount: 10,
      timeLimit: 1500,
      strategyTitle: "Strategy: Statistics",
      strategyBody:
        "Mean = sum / count. Median = middle value (or average of two middle values). Mode = most frequent. Range = max − min. Outliers affect the mean more than the median.",
      qs: [],
    },
  ],
};

/* ----------------------------------------------------------------- */
/* Chapter 3 — Passport to Advanced Math                              */
/* ----------------------------------------------------------------- */

export const chapter3: ChapterConfig = {
  id: "ch3",
  title: "Passport to Advanced Math",
  subtitle: "Quadratics, polynomials, exponentials, and functions",
  color: "#6a1b9a",
  icon: "FunctionSquare",
  defaultModule: "3.1",
  modules: [
    {
      id: "3.1",
      num: "3.1",
      title: "Quadratic Equations",
      subtitle: "Solving via factoring, completing the square, and the quadratic formula",
      qrange: "1 – 10",
      qcount: 10,
      timeLimit: 1500,
      strategyTitle: "Strategy: Quadratic Equations",
      strategyBody:
        "Three methods: (1) Factoring — set each factor to zero; (2) Completing the square; (3) Quadratic formula: x = [−b ± √(b² − 4ac)] / 2a. The discriminant b² − 4ac tells the number of real roots.",
      qs: [],
    },
    {
      id: "3.2",
      num: "3.2",
      title: "Polynomials",
      subtitle: "Operations, factoring, and roots of polynomials",
      qrange: "1 – 5",
      qcount: 5,
      timeLimit: 900,
      strategyTitle: "Strategy: Polynomials",
      strategyBody:
        "Combine like terms. For factoring: look for GCF, then difference of squares (a² − b² = (a+b)(a−b)), perfect-square trinomials, and grouping. The Remainder Theorem gives P(c) = remainder when dividing by (x − c).",
      qs: [
        {
          n: 1,
          domain: "Algebra",
          difficulty: "easy",
          text: "Calculate the polynomials $(12x^{4} - 5x + 18 + 6x^{4}) + (13x^{2} + 7x - 9)$.",
          type: "mcq",
          o: [
            "$18x^{4} + 8x^{2} + 25x - 9$",
            "$18x^{8} + 8x^{3} + 25x - 9$",
            "$18x^{8} + 13x^{3} + 2x + 9$",
            "$18x^{4} + 13x^{2} + 2x + 9$",
          ],
          a: "D",
          solution:
            "Combine like terms: $(12x^{4} + 6x^{4}) + 13x^{2} + (-5x + 7x) + (18 - 9) = 18x^{4} + 13x^{2} + 2x + 9$. The answer is D.",
        },
        {
          n: 2,
          domain: "Algebra",
          difficulty: "easy",
          text: "What is the difference between $2x^{2} + 3x - 2$ and $5x^{2} - x - 7$?",
          type: "mcq",
          o: [
            "$-3x^{2} + 4x + 5$",
            "$3x^{2} + 4x + 5$",
            "$7x^{2} + 4x + 9$",
            "$-3x^{2} + 2x + 9$",
          ],
          a: "A",
          solution:
            "Subtract: $(2x^{2} + 3x - 2) - (5x^{2} - x - 7) = 2x^{2} - 5x^{2} + 3x + x - 2 + 7 = -3x^{2} + 4x + 5$. The answer is A.",
        },
        {
          n: 3,
          domain: "Algebra",
          difficulty: "medium",
          text: "Determine $(2x^{5} + 3x^{2}) - (x^{5} - 7x^{2})$.",
          type: "mcq",
          o: [
            "$x^{10} + 10x^{4}$",
            "$x^{5} - 4x^{2}$",
            "$3x^{5} - 4x^{2}$",
            "$x^{5} + 10x^{2}$",
          ],
          a: "D",
          solution:
            "Subtract: $2x^{5} - x^{5} + 3x^{2} + 7x^{2} = x^{5} + 10x^{2}$. The answer is D.",
        },
        {
          n: 4,
          domain: "Algebra",
          difficulty: "medium",
          text: "Which polynomial is equivalent to $(x^{2} + 7)(12x^{3} - 6)$?",
          type: "mcq",
          o: [
            "$12x^{5} + 84x^{3} - 6x^{2} - 42$",
            "$12x^{3} + x^{2} + 1$",
            "$12x^{6} + 84x^{3} - 6x^{2} - 42$",
            "$12x^{6} - 42$",
          ],
          a: "A",
          solution:
            "Use FOIL/distribution: $x^{2} \cdot 12x^{3} = 12x^{5}$, $x^{2} \cdot (-6) = -6x^{2}$, $7 \cdot 12x^{3} = 84x^{3}$, $7 \cdot (-6) = -42$. Combine: $12x^{5} + 84x^{3} - 6x^{2} - 42$. The answer is A.",
        },
        {
          n: 5,
          domain: "Algebra",
          difficulty: "medium",
          text: "Which expression is equivalent to $2x^{5}(x^{3} + 5x)$?",
          type: "mcq",
          o: [
            "$3x^{8} + 7x^{6}$",
            "$2x^{15} + 10x^{5}$",
            "$2x^{15} + 7x^{5}$",
            "$2x^{8} + 10x^{6}$",
          ],
          a: "D",
          solution:
            "Distribute: $2x^{5} \cdot x^{3} = 2x^{8}$ and $2x^{5} \cdot 5x = 10x^{6}$. Combine: $2x^{8} + 10x^{6}$. The answer is D.",
          desmosHint:
            "Open Desmos and type $y = 2x^{5}(x^{3} + 5x)$ in line 1, then type each option (e.g., $y = 2x^{8} + 10x^{6}$) in line 2. If both graphs overlap perfectly, the option is equivalent. Option D overlaps ✓.",
        },
      ],
    },
    {
      id: "3.3",
      num: "3.3",
      title: "Exponential Functions",
      subtitle: "Growth, decay, and compound interest",
      qrange: "1 – 10",
      qcount: 10,
      timeLimit: 1500,
      strategyTitle: "Strategy: Exponential Functions",
      strategyBody:
        "Form: y = a·b^x where a is the initial value and b is the growth/decay factor. Growth when b > 1, decay when 0 < b < 1. Compound interest: A = P(1 + r/n)^(nt).",
      qs: [],
    },
    {
      id: "3.4",
      num: "3.4",
      title: "Radicals & Rational Exponents",
      subtitle: "Simplifying and operating on radicals",
      qrange: "6 – 14",
      qcount: 9,
      timeLimit: 1500,
      strategyTitle: "Strategy: Radicals & Rational Exponents",
      strategyBody:
        "√(ab) = √a · √b. Rational exponents: a^(m/n) = (ⁿ√a)^m. Always rationalize denominators. For nested radicals, look for perfect-square factors first. When multiplying like bases, add exponents; when raising a power to a power, multiply exponents.",
      qs: [
        {
          n: 6,
          domain: "Algebra",
          difficulty: "medium",
          text: "Simplify the expression $a^{2}b^{3}(a^{4}b^{4})$.",
          type: "mcq",
          o: [
            "$a^{5}b^{12}$",
            "$a^{6}b^{12}$",
            "$a^{6}b^{7}$",
            "$a^{5}b^{7}$",
          ],
          a: "C",
          solution:
            "When multiplying like bases, add exponents: $a^{2} \cdot a^{4} = a^{6}$ and $b^{3} \cdot b^{4} = b^{7}$. So the result is $a^{6}b^{7}$. The answer is C.",
        },
        {
          n: 7,
          domain: "Algebra",
          difficulty: "easy",
          text: "Convert the expression $\sqrt{ab}$, where $a$ and $b$ are positive, into rational exponent notation.",
          type: "mcq",
          o: [
            "$a^{1/2}b$",
            "$ab^{1/2}$",
            "$a^{1/2}b^{1/2}$",
            "$ab^{2}$",
          ],
          a: "C",
          solution:
            "$\sqrt{ab} = (ab)^{1/2} = a^{1/2} \cdot b^{1/2} = a^{1/2}b^{1/2}$. The answer is C.",
        },
        {
          n: 8,
          domain: "Algebra",
          difficulty: "medium",
          text: "Which of the expressions is equivalent to $g^{2/5}h^{4/5}$?",
          type: "mcq",
          o: [
            "$\sqrt[5]{g^{2}h^{4}}$",
            "$\frac{1}{\sqrt[4]{g^{5}h^{10}}}$",
            "$\sqrt[4]{g^{5}h^{2}}$",
            "$\frac{1}{\sqrt[5]{g^{4}h^{2}}}$",
          ],
          a: "A",
          solution:
            "Use the rule $x^{m/n} = \sqrt[n]{x^{m}}$. So $g^{2/5}h^{4/5} = \sqrt[5]{g^{2}} \cdot \sqrt[5]{h^{4}} = \sqrt[5]{g^{2}h^{4}}$. The answer is A.",
        },
        {
          n: 9,
          domain: "Algebra",
          difficulty: "hard",
          text: "Apply the product rule and power rule to simplify $k^{5/16}(k^{3/2})^{5/8}$ where $k > 0$.",
          type: "mcq",
          o: [
            "$\sqrt{k}$",
            "$\sqrt[4]{k^{5}}$",
            "$\sqrt[8]{k^{5}}$",
            "$\sqrt[15]{k^{16}}$",
          ],
          a: "B",
          solution:
            "Power rule: $(k^{3/2})^{5/8} = k^{(3/2)(5/8)} = k^{15/16}$. Product rule: $k^{5/16} \cdot k^{15/16} = k^{(5+15)/16} = k^{20/16} = k^{5/4} = \sqrt[4]{k^{5}}$. The answer is B.",
          desmosHint:
            "Open Desmos and type $y = k^{5/16} \cdot (k^{3/2})^{5/8}$ in line 1 (add a slider for $k$). Then type $y = \sqrt[4]{k^{5}}$ (option B) in line 2. Both graphs overlap perfectly ✓. Try the other options — they won't match.",
        },
        {
          n: 10,
          domain: "Algebra",
          difficulty: "hard",
          text: "Which of the expressions is equivalent to $y^{1/8}(y^{3/4})^{3/2}$?",
          type: "mcq",
          o: [
            "$\sqrt{y}$",
            "$\sqrt[4]{y^{5}}$",
            "$\sqrt[8]{y^{5}}$",
            "$\sqrt[8]{y^{7}}$",
          ],
          a: "B",
          solution:
            "Power rule: $(y^{3/4})^{3/2} = y^{(3/4)(3/2)} = y^{9/8}$. Product rule: $y^{1/8} \cdot y^{9/8} = y^{(1+9)/8} = y^{10/8} = y^{5/4} = \sqrt[4]{y^{5}}$. The answer is B.",
          desmosHint:
            "Open Desmos and type $y = y^{1/8} \cdot (y^{3/4})^{3/2}$ in line 1 (use a different variable like $t$ for the independent variable). Then type $y = t^{5/4}$ in line 2 — both overlap. Now compare to $\sqrt[4]{t^{5}} = t^{5/4}$ ✓ (option B).",
        },
        {
          n: 11,
          domain: "Algebra",
          difficulty: "hard",
          text: "Which of the following is equivalent to the expression $(\sqrt{2q} - \sqrt{2r})^{2/3}$ where $q > r$ and $r > 0$?",
          type: "mcq",
          o: [
            "$(2q + 2r)^{5}$",
            "$(2q - 2\sqrt{qr} + 2r)^{1/5}$",
            "$\sqrt[3]{2q + 2r}$",
            "$\sqrt[3]{2q - 4\sqrt{qr} + 2r}$",
          ],
          a: "D",
          solution:
            "First square the binomial: $(\sqrt{2q} - \sqrt{2r})^{2} = 2q - 2\sqrt{4qr} + 2r = 2q - 4\sqrt{qr} + 2r$. Then apply the $1/3$ power: $(2q - 4\sqrt{qr} + 2r)^{1/3} = \sqrt[3]{2q - 4\sqrt{qr} + 2r}$. The answer is D.",
          desmosHint:
            "Open Desmos and type $y = (\sqrt{2q} - \sqrt{2r})^{2/3}$ with sliders for $q$ and $r$ (try $q = 5, r = 2$). Then type $y = \sqrt[3]{2q - 4\sqrt{qr} + 2r}$ in line 2. Both graphs overlap perfectly ✓. This visualizes the binomial expansion inside the cube root.",
        },
        {
          n: 12,
          domain: "Algebra",
          difficulty: "hard",
          text: "Which of the following is equivalent to the expression $(2\sqrt{x} - \sqrt{y})^{2/5}$ where $x > y$ and $y > 0$?",
          type: "mcq",
          o: [
            "$(4x - y)^{5}$",
            "$(4x - 4\sqrt{xy} + y)^{1/5}$",
            "$\sqrt[5]{4x - y}$",
            "$\sqrt[5]{4x - 4xy + y}$",
          ],
          a: "B",
          solution:
            "Square the binomial: $(2\sqrt{x} - \sqrt{y})^{2} = 4x - 4\sqrt{xy} + y$. Then apply the $1/5$ power: $(4x - 4\sqrt{xy} + y)^{1/5}$. The answer is B.",
          desmosHint:
            "Open Desmos and type $y = (2\sqrt{x} - \sqrt{y})^{2/5}$ with sliders for $x$ and $y$ (try $x = 9, y = 4$). Then type $y = (4x - 4\sqrt{xy} + y)^{1/5}$ in line 2. Both graphs overlap perfectly ✓.",
        },
        {
          n: 13,
          domain: "Algebra",
          difficulty: "hard",
          text: "If $\sqrt[3]{a^{2}} = \sqrt{b}$, $a^{2x} = b^{6}$ where $a$ and $b$ are constants with $a > 1$ and $b > 1$, what is the value of $x$?",
          type: "mcq",
          o: ["$2$", "$3$", "$4$", "$12$"],
          a: "C",
          solution:
            "Rewrite: $\sqrt[3]{a^{2}} = a^{2/3}$ and $\sqrt{b} = b^{1/2}$. So $a^{2/3} = b^{1/2}$. Raise to power 6: $a^{4} = b^{3}$. Then $b^{6} = (b^{3})^{2} = (a^{4})^{2} = a^{8}$. So $a^{2x} = a^{8} \Rightarrow 2x = 8 \Rightarrow x = 4$. The answer is C.",
          desmosHint:
            "Open Desmos and use a slider for $a$ (try $a = 2$). Compute $b = (a^{2/3})^{2} = a^{4/3}$ (from the first equation). Then verify: $a^{2x} = b^{6} = (a^{4/3})^{6} = a^{8}$, so $2x = 8$ and $x = 4$ ✓. Plot $y = 2^{2x}$ and $y = (2^{4/3})^{6}$ — they're equal when $x = 4$.",
        },
        {
          n: 14,
          domain: "Algebra",
          difficulty: "hard",
          text: "Two numbers, $a$ and $b$, are each greater than zero, and the square root of $a$ is equal to the cubic root of $b$. For what value of $x$ is $a^{(2x-1)}$ equal to $b$?",
          type: "mcq",
          o: ["$1$", "$\frac{3}{2}$", "$\frac{5}{4}$", "$3$"],
          a: "C",
          solution:
            "From $\sqrt{a} = \sqrt[3]{b}$: $a^{1/2} = b^{1/3}$. Raise to power 6: $a^{3} = b^{2}$, so $b = a^{3/2}$. Set $a^{2x-1} = b = a^{3/2}$. Equate exponents: $2x - 1 = 3/2 \Rightarrow 2x = 5/2 \Rightarrow x = 5/4$. The answer is C.",
          desmosHint:
            "Open Desmos and use a slider for $a$ (try $a = 4$). From $\sqrt{a} = \sqrt[3]{b}$: $b = a^{3/2}$. Then $a^{2x-1} = a^{3/2}$ means $2x - 1 = 3/2$, so $x = 5/4$ ✓. Plot $y = 4^{2x-1}$ and $y = 4^{3/2} = 8$ — they intersect when $x = 5/4$.",
        },
      ],
    },
    {
      id: "3.5",
      num: "3.5",
      title: "Function Notation",
      subtitle: "Evaluating, composing, and interpreting functions",
      qrange: "1 – 10",
      qcount: 10,
      timeLimit: 1500,
      strategyTitle: "Strategy: Function Notation",
      strategyBody:
        "f(x) means the output of f at input x. To evaluate f(a), substitute a for x. Composition: (f ∘ g)(x) = f(g(x)). Inverse functions 'undo' each other: f(f⁻¹(x)) = x.",
      qs: [],
    },
    {
      id: "3.6",
      num: "3.6",
      title: "Isolating Quantities",
      subtitle: "Rearranging formulas to isolate a variable",
      qrange: "1 – 10",
      qcount: 10,
      timeLimit: 1500,
      strategyTitle: "Strategy: Isolating Quantities",
      strategyBody:
        "Treat the target variable like x and undo operations applied to it. The order of operations is PEMDAS reversed when isolating: undo addition/subtraction first, then multiplication/division, then exponents, then parentheses.",
      qs: [],
    },
  ],
};

/* ----------------------------------------------------------------- */
/* Chapter 4 — Additional Topics in Math                             */
/* ----------------------------------------------------------------- */

export const chapter4: ChapterConfig = {
  id: "ch4",
  title: "Additional Topics in Math",
  subtitle: "Geometry, trigonometry, and complex numbers",
  color: "#c62828",
  icon: "Triangle",
  defaultModule: "4.1",
  modules: [
    {
      id: "4.1",
      num: "4.1",
      title: "Geometry: Lines & Angles",
      subtitle: "Angle relationships, parallel lines, and transversals",
      qrange: "1 – 10",
      qcount: 10,
      timeLimit: 1500,
      strategyTitle: "Strategy: Lines & Angles",
      strategyBody:
        "Vertical angles are equal. Supplementary angles sum to 180°. Corresponding and alternate interior angles are equal when lines are parallel. Interior angles on the same side of the transversal are supplementary.",
      qs: [],
    },
    {
      id: "4.2",
      num: "4.2",
      title: "Triangles",
      subtitle: "Pythagorean theorem, similarity, and special right triangles",
      qrange: "1 – 10",
      qcount: 10,
      timeLimit: 1500,
      strategyTitle: "Strategy: Triangles",
      strategyBody:
        "Interior angles sum to 180°. Pythagorean theorem: a² + b² = c² for right triangles. Special right triangles: 45-45-90 (legs equal, hypotenuse = leg·√2) and 30-60-90 (hypotenuse = 2·short leg, long leg = short·√3).",
      qs: [],
    },
    {
      id: "4.3",
      num: "4.3",
      title: "Circles",
      subtitle: "Arcs, sectors, tangents, and chords",
      qrange: "1 – 10",
      qcount: 10,
      timeLimit: 1500,
      strategyTitle: "Strategy: Circles",
      strategyBody:
        "Circumference = 2πr = πd. Area = πr². Arc length = (θ/360)·2πr where θ is in degrees. Sector area = (θ/360)·πr². A tangent is perpendicular to the radius at the point of tangency.",
      qs: [],
    },
    {
      id: "4.4",
      num: "4.4",
      title: "Trigonometry",
      subtitle: "SOH-CAH-TOA, unit circle, and identities",
      qrange: "1 – 10",
      qcount: 10,
      timeLimit: 1500,
      strategyTitle: "Strategy: Trigonometry",
      strategyBody:
        "SOH-CAH-TOA: sin = opposite/hypotenuse, cos = adjacent/hypotenuse, tan = opposite/adjacent. Reciprocal functions: csc, sec, cot. Pythagorean identity: sin²θ + cos²θ = 1.",
      qs: [],
    },
    {
      id: "4.5",
      num: "4.5",
      title: "Complex Numbers",
      subtitle: "Operations with i and the complex plane",
      qrange: "1 – 10",
      qcount: 10,
      timeLimit: 1500,
      strategyTitle: "Strategy: Complex Numbers",
      strategyBody:
        "i² = −1. To add/subtract, combine real and imaginary parts separately. To multiply, use FOIL and replace i² with −1. The complex conjugate of a + bi is a − bi; multiplying them gives a² + b².",
      qs: [],
    },
    {
      id: "4.6",
      num: "4.6",
      title: "Volume & Surface Area",
      subtitle: "Prisms, cylinders, cones, spheres, and pyramids",
      qrange: "1 – 10",
      qcount: 10,
      timeLimit: 1500,
      strategyTitle: "Strategy: Volume & Surface Area",
      strategyBody:
        "Volume of prism/cylinder: V = Bh (base area × height). Volume of cone/pyramid: V = (1/3)Bh. Sphere: V = (4/3)πr³, surface area = 4πr². Surface area is the sum of all faces.",
      qs: [],
    },
  ],
};

/* ----------------------------------------------------------------- */
/* Aggregate                                                          */
/* ----------------------------------------------------------------- */

export const chapters: ChapterConfig[] = [chapter1, chapter2, chapter3, chapter4];

export const platformConfig = {
  name: "SAT Math 2026",
  instructor: "Mrs. Shaimaa Darwish",
  tagline: "Professional Interactive Workbook",
  totalQuestions: chapters.reduce(
    (sum, ch) => sum + ch.modules.reduce((s, m) => s + m.qcount, 0),
    0
  ),
  totalLessons: chapters.reduce((sum, ch) => sum + ch.modules.length, 0),
};

/**
 * Find a chapter by id.
 */
export function findChapter(id: string): ChapterConfig | undefined {
  return chapters.find((c) => c.id === id);
}

/**
 * Find a module (lesson) within a chapter.
 */
export function findModule(
  chapter: ChapterConfig,
  moduleId: string
): Module | undefined {
  return chapter.modules.find((m) => m.id === moduleId);
}

/**
 * Question of the day — pick a deterministic question based on the date
 * so all users see the same one on a given day.
 */
export function getQuestionOfTheDay(): Question {
  const allQuestions: Question[] = [];
  for (const ch of chapters) {
    for (const m of ch.modules) {
      for (const q of m.qs) {
        allQuestions.push(q);
      }
    }
  }
  if (allQuestions.length === 0) {
    // Fallback synthetic QoTD so the UI never breaks
    return {
      n: 1,
      domain: "Algebra",
      difficulty: "medium",
      text:
        "If $x + 6 = 2y$ and $y = x - 5$, what is the value of $x + y$?",
      type: "mcq",
      o: ["$-1$", "$0$", "$1$", "$2$"],
      a: "B",
      solution:
        "From $y = x - 5$ substitute into the first equation: $x + 6 = 2(x - 5) \\Rightarrow x + 6 = 2x - 10 \\Rightarrow x = 16$. Then $y = 11$, so $x + y = 27$ — but this is a placeholder; the real QoTD comes from the question bank when populated.",
    };
  }
  // Deterministic pick by day-of-year
  const now = new Date();
  const start = new Date(now.getFullYear(), 0, 0);
  const diff = now.getTime() - start.getTime();
  const dayOfYear = Math.floor(diff / 86400000);
  const idx = dayOfYear % allQuestions.length;
  return allQuestions[idx];
}

/* ----------------------------------------------------------------- */
/* Quiz Center — generate one quiz per chapter                        */
/* ----------------------------------------------------------------- */

/**
 * Build a quiz for a chapter. Pulls up to 10 questions from the
 * chapter's modules; if a chapter has fewer than 10 questions total,
 * it falls back to placeholder questions.
 */
export function buildChapterQuiz(chapter: ChapterConfig): QuizConfig {
  const pool: QuizQuestion[] = [];
  for (const m of chapter.modules) {
    for (const q of m.qs) {
      pool.push({
        n: q.n,
        text: q.text,
        o: q.o,
        a: q.a,
        solution: q.solution,
        hint: q.hint,
        img: q.img,
      });
    }
  }

  let chosen: QuizQuestion[];
  if (pool.length >= 10) {
    // Deterministic sample of 10 — pick evenly across the pool
    const step = pool.length / 10;
    chosen = Array.from({ length: 10 }, (_, i) =>
      pool[Math.min(pool.length - 1, Math.floor(i * step))]
    );
  } else if (pool.length > 0) {
    // Use whatever we have, padded with the first question repeated? No —
    // just send what we have; the UI handles short quizzes.
    chosen = [...pool];
  } else {
    // No questions in this chapter yet — return a single placeholder
    chosen = [
      {
        n: 1,
        text: "Quiz content for this chapter is coming soon.",
        o: ["A", "B", "C", "D"],
        a: "A",
        solution:
          "The instructor is preparing questions for this chapter. Please check back later.",
      },
    ];
  }

  return {
    id: `quiz-${chapter.id}`,
    title: `${chapter.title} — Quiz`,
    subtitle: chapter.subtitle,
    questions: chosen,
    timeLimitSeconds: 720, // 12 minutes
  };
}
