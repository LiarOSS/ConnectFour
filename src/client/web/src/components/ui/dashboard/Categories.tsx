import React from "react";
import Section from "./Section";
import Category from "./Category";

interface ICategory {
    icon: React.ComponentType<React.SVGProps<SVGSVGElement>>,
    text: string,
    unit?: string,
    amount?: string | number,
    color: {
        text: string,
        bg: string
    }
}

interface Props {
    categories: Record<string, ICategory>
}

const Categories = ({...props}: Props) => (
    <Section title="Categories">
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-4 mt-4">
            {Object.entries(props.categories).map(([key, category]) => (
                <Category link={key} icon={category.icon} text={category.text} amount={category.amount}
                          color={category.color}/>
            ))}
        </div>
    </Section>
)

export default Categories;