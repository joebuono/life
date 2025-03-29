export interface TreeNodeData {
  isCustom?: boolean;
  [key: string]: TreeNodeData | boolean | undefined;
}

export interface TreeNodeProps {
  label: string;
  children: TreeNodeData;
  level?: number;
  onAddChild: (parentLabel: string, newChildName: string) => void;
  onDeleteChild: (childLabel: string) => void;
  isSubcategory?: boolean;
  parentCategory?: string;
} 