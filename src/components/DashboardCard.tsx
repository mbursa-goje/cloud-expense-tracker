import type { CardProps } from '../types/page.content'

export default function Card({data}: CardProps ){

    const formattedValue = data.valueType === "money" ? `$${data.valueType}` : `${data.valueType} units`
    return(
        <div>
            <div className="uppercase leading-widest text-base text-slate-300">{data.title}</div>
            <div>{formattedValue}</div>
            <div>{data.info}</div>
        </div>
    )
}