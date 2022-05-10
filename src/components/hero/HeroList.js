import { useMemo } from "react";

import { HeroCard } from "./HeroCard";

import { getHeroesByPublisher } from "../../selectors/getHeroesByPublisher"

export const HeroList = ({ publisher }) => {

  const heroes = useMemo(() => getHeroesByPublisher( publisher ), [publisher]);

  return (
    <div className="row row-cols-2 row-cols-lg-3 g-2 g-lg-3 animate__animated animate__fadeIn" >

        {
          heroes.map( hero => (

            <HeroCard 
              key={ hero.id }
              { ...hero }
            />

          ))
        }

    </div>
  )
}
