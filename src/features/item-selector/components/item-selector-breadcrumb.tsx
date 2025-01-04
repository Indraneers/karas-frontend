import { Breadcrumb, BreadcrumbItem, BreadcrumbList, BreadcrumbSeparator } from "@/components/ui/breadcrumb";
import { useItemSelectionStore } from "../store/item-selection";
import { ItemSelectionEnum } from "../types/item-selection-enum";
import { cn } from "@/lib/utils";

export function ItemSelectorBreadCrumb() {
  const { selector, setSelector, category, subcategory, product } = useItemSelectionStore();

  function isBreadcrumbVisible(itemSelectionType: ItemSelectionEnum) {
    switch(itemSelectionType) {
    case ItemSelectionEnum.SUBCATEGORY:
      if (selector === ItemSelectionEnum.UNIT || selector === ItemSelectionEnum.PRODUCT || selector === ItemSelectionEnum.SUBCATEGORY) {
        return 'block';
      }
      break;
    case ItemSelectionEnum.PRODUCT:
      if (selector === ItemSelectionEnum.UNIT || selector === ItemSelectionEnum.PRODUCT) {
        return 'block';
      }
      break;
    case ItemSelectionEnum.UNIT:
      if (selector === ItemSelectionEnum.UNIT) {
        return 'block';
      }
      break;
    default:
      return 'hidden';
    }
  }

  return (
    <Breadcrumb>  
      <BreadcrumbList>
        {/* Category */}
        <BreadcrumbItem 
          className="text-accent hover:underline cursor-pointer" 
          onClick={() => setSelector(ItemSelectionEnum.CATEGORY)}
        >
          Categories
        </BreadcrumbItem>
        {/* Subcategory */}
        <BreadcrumbSeparator 
          className={cn([isBreadcrumbVisible(ItemSelectionEnum.SUBCATEGORY) ? 'block text-accent' : 'hidden'])} 
        />
        <BreadcrumbItem
          onClick={() => setSelector(ItemSelectionEnum.SUBCATEGORY)}
          className={cn([
            "hover:underline cursor-pointer text-accent",
            isBreadcrumbVisible(ItemSelectionEnum.SUBCATEGORY) ? 'block' : 'hidden'
          ])} 
        >
          {category?.name}
        </BreadcrumbItem>
        {/* Product */}
        <BreadcrumbSeparator 
          className={cn([isBreadcrumbVisible(ItemSelectionEnum.PRODUCT) ? 'block text-accent' : 'hidden'])} 
        />
        <BreadcrumbItem
          onClick={() => setSelector(ItemSelectionEnum.PRODUCT)}
          className={cn([
            "hover:underline cursor-pointer text-accent",
            isBreadcrumbVisible(ItemSelectionEnum.PRODUCT) ? 'block' : 'hidden'
          ])} 
        >
          {subcategory?.name}
        </BreadcrumbItem>
        {/* Unit */}
        <BreadcrumbSeparator 
          className={cn([isBreadcrumbVisible(ItemSelectionEnum.UNIT) ? 'block text-accent' : 'hidden'])} 
        />
        <BreadcrumbItem
          className={cn([isBreadcrumbVisible(ItemSelectionEnum.UNIT) ? 'block text-accent' : 'hidden'])} 
        >
          {product?.name}
        </BreadcrumbItem>
      </BreadcrumbList>
    </Breadcrumb>
  );
}