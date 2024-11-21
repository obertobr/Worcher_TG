import { IonIcon } from "@ionic/react";
import { funnelOutline } from "ionicons/icons";
import { useEffect, useRef, useState } from "react";
import "./filterEventCategory.css"
import EventCategory from "../../../../Models/Event/event.category.entity";
import InstitutionService from "../../../../Service/Instituition/institution.service";
import LocalStorageInstituionUtils from "../../../../Utils/LocalStorage/local.storage.institution.utils";
import Institution from "../../../../Models/Instituition/institution.entity";

interface FilterCategoryProps {
    onChange: (id: number | undefined) => void;
}
  
const FilterCategory: React.FC<FilterCategoryProps> = ({
    onChange,
}) => {
    
  const eventCategoryAll: EventCategory = new EventCategory()
  eventCategoryAll.name = "Todas as categorias"
  eventCategoryAll.id = undefined

    const [isOpen, setIsOpen] = useState(false);
    const [selectedCategory, setSelectedCategory] = useState<EventCategory>(eventCategoryAll);
    const filterRef = useRef<HTMLDivElement>(null);
    const [eventCategoryList, setEventCategoryList] = useState<EventCategory[]>([]);

    

    useEffect(() => {
      onChange(undefined)
      loadEventCategoryList()
    },[])

    const loadEventCategoryList = async () => {
      const institutionService = new InstitutionService()
        const localStorageInstituionUtils = new LocalStorageInstituionUtils()
        const idInstituition = localStorageInstituionUtils.getId()
        let institution = new Institution()

        if(idInstituition){
            institution = await institutionService.getById(idInstituition) || new Institution()
        }

        institution.eventCategoryList = institution.eventCategoryList.map( e => {
            const eventCategory = new EventCategory()
            eventCategory.id = e.id
            eventCategory.name = e.name
            eventCategory.institution = e.institution

            return eventCategory
        } )

        institution.eventCategoryList.unshift(eventCategoryAll)
        setEventCategoryList(institution.eventCategoryList)
    }
  
    const toggleDropdown = () => setIsOpen((prev) => !prev);
  
    const handleCategorySelect = (category: EventCategory) => {
      setSelectedCategory(category);
      setIsOpen(false);

      onChange(category.id)
    };
  
    const handleClickOutside = (event: MouseEvent) => {
      if (filterRef.current && !filterRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
  
    useEffect(() => {
      document.addEventListener("click", handleClickOutside);
      return () => {
        document.removeEventListener("click", handleClickOutside);
      };
    }, []);

    return (
      <div className="filterCategory" ref={filterRef}>
        <div className="filterHeader" onClick={toggleDropdown}>
          <span>{selectedCategory.name}</span>
          <IonIcon icon={funnelOutline} className="filterIcon" />
        </div>

        {isOpen && (
          <div className="filterDropdown">
            {eventCategoryList.map((category,index) => (
              <div
                key={index}
                className={"filterOption" + (selectedCategory.id === category.id ? " selected" : "")}
                onClick={() => handleCategorySelect(category)}
              >
                <span>{category.name}</span>
              </div>
            ))}
          </div>
        )}
      </div>
    );
  };
  
  export default FilterCategory;