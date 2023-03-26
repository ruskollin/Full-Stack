export interface HeaderProps {
  name: string;
}

interface CoursePartBase {
  name: string;
  exerciseCount: number;
}

interface Description extends CoursePartBase {
  description: string;
}

interface CoursePartBasic extends Description {
  kind: "basic"
}

interface CoursePartGroup extends CoursePartBase {
  groupProjectCount: number;
  kind: "group"
}

interface CoursePartBackground extends Description {
  backroundMaterial: string;
  kind: "background"
}

interface CoursePartComplete extends Description {
  kind: "special",
  requirements: ["nodejs", "jest"],
}

export type CoursePart = CoursePartBasic | CoursePartGroup | CoursePartBackground | CoursePartComplete;
