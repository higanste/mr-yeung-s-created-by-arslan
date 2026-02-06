export type TopicCategory = 'Number' | 'Algebra' | 'Geometry' | 'Data';

export interface Topic {
    id: string;
    name: string;
    category: TopicCategory;
}

export const TOPICS: Topic[] = [
    // Number
    { id: 'addition', name: 'Addition', category: 'Number' },
    { id: 'subtraction', name: 'Subtraction', category: 'Number' },
    { id: 'multiplication', name: 'Multiplication', category: 'Number' },
    { id: 'division', name: 'Division', category: 'Number' },
    { id: 'fractions_add', name: 'Fractions (Add/Sub)', category: 'Number' },
    { id: 'percentages', name: 'Percentages of Amounts', category: 'Number' },

    // Algebra
    { id: 'solve_linear', name: 'Solving Linear Equations', category: 'Algebra' },
    { id: 'expand_brackets', name: 'Expanding Brackets', category: 'Algebra' },
    { id: 'substitution', name: 'Substitution', category: 'Algebra' },
    { id: 'simplify', name: 'Simplifying Expressions', category: 'Algebra' },

    // Geometry
    { id: 'area_rect', name: 'Area of Rectangles', category: 'Geometry' },
    { id: 'perimeter', name: 'Perimeter', category: 'Geometry' },
    { id: 'angles_triangle', name: 'Angles in a Triangle', category: 'Geometry' },

    // Data
    { id: 'mean', name: 'Mean Average', category: 'Data' },
    { id: 'range', name: 'Range', category: 'Data' },
];
