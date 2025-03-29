export interface TreeNodeData {
  [key: string]: {
    isCustom?: boolean;
    [key: string]: any;
  };
}

export interface TreeNodeProps {
  label: string;
  children: TreeNodeData;
  level?: number;
  onAddChild: (parentLabel: string, newChildName: string) => void;
  onDeleteChild: (childLabel: string) => void;
  isSubcategory?: boolean;
  parentCategory?: string | null;
} 