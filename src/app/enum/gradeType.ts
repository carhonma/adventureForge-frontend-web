export enum GradeType {
    F = 'F',
    D = 'D',
    C = 'C',
    B = 'B',
    A = 'A',
    S = 'S',
  }

  export const gradeStyles: Record<GradeType, {icon: string}> = {
    [GradeType.F]: { icon: 'grade/grade_d.png'},
    [GradeType.D]: { icon: 'grade/grade_d.png'},
    [GradeType.C]: { icon: 'grade/grade_c.png'},
    [GradeType.B]: { icon: 'grade/grade_b.png'},
    [GradeType.A]: { icon: 'grade/grade_a.png'},
    [GradeType.S]: { icon: 'grade/grade_s.png'} 
  }