import { Breadcrumb, BreadcrumbItem, BreadcrumbList, BreadcrumbSeparator } from "@/components/ui/breadcrumb";
import { useItemSelectionStore } from "../store/item-selection";
import { ItemSelectionEnum } from "../types/item-selection-enum";
import { cn } from "@/lib/utils";

export function ItemSelectorBreadCrumb() {
  const { selector, setSelector } = useItemSelectionStore();

  function isBreadcrumbVisible(itemSelectionType: ItemSelectionEnum) {
    switch(itemSelectionType) {
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
          className="hover:underline cursor-pointer" 
          onClick={() => setSelector(ItemSelectionEnum.CATEGORY)}
        >
          Categories
        </BreadcrumbItem>
        {/* Product */}
        <BreadcrumbSeparator 
          className={cn([isBreadcrumbVisible(ItemSelectionEnum.PRODUCT) ? 'block' : 'hidden'])} 
        />
        <BreadcrumbItem
          onClick={() => setSelector(ItemSelectionEnum.PRODUCT)}
          className={cn([
            "hover:underline cursor-pointer",
            isBreadcrumbVisible(ItemSelectionEnum.PRODUCT) ? 'block' : 'hidden'
          ])} 
        >
          Engine Oil
        </BreadcrumbItem>
        {/* Unit */}
        <BreadcrumbSeparator 
          className={cn([isBreadcrumbVisible(ItemSelectionEnum.UNIT) ? 'block' : 'hidden'])} 
        />
        <BreadcrumbItem
          className={cn([isBreadcrumbVisible(ItemSelectionEnum.UNIT) ? 'block' : 'hidden'])} 
        >
          Engine Oil
        </BreadcrumbItem>
      </BreadcrumbList>
    </Breadcrumb>
  );
}