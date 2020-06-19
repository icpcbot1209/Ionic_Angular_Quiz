export interface MyData { 
  appName: string,
  version: string,
  adminEmail: string,
  arrCategory: string[],
  arrCodeRule: CodeRule[],
  arrQuizAll: Quiz[]
}

export interface Quiz {
  category: string,
  question: string,
  arrOption: string[],
  answer: string
}

export interface CodeRule {
  code: string,
  about: string,
  rules: string[],
  numQuiz: number,
  minPassRate: number
}



export interface Test { 
  codeRule: CodeRule,
  arrQuiz: Quiz[],
}

export interface TestResult { 
  passRate: number,
  arrWrong: Quiz[]
}
