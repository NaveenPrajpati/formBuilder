type FieldType =
  | 'multipleChoice'
  | 'dropdown'
  | 'checkbox'
  | 'checkboxGrid'
  | 'multipleChoiceGrid'
  | 'date'
  | 'time'
  | 'image'
  | 'video'
  | 'info'
  | 'short'
  | 'paragraph'
  | 'linearScale'
  | string; // Include `string` for extensibility if there are other types.

type fieldsType = {
  id: string;
  type: FieldType;
  question: string;
  required: boolean;
  other: boolean;
  image: string | null; // Assuming image is a URL or file path
  video: string | null; // Assuming video is a URL or file path
  multipleChoice: boolean;
  options: string[]; // Options for multipleChoice, dropdown, or checkbox
  rows: string[]; // Rows for checkboxGrid or multipleChoiceGrid
  columns: string[]; // Columns for checkboxGrid or multipleChoiceGrid
  settings: {
    includeYear?: boolean;
    includeTime?: boolean;
  }; // Settings for date or time type
};
export interface formTypes {
  header: string;
  description: string;
  headerImg: string;
  fields: fieldsType[];
}
