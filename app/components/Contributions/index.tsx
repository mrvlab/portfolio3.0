import React from 'react';
import { Contributions as ContributionsType } from '@/sanity.types';

type IContributions = {
  block: ContributionsType;
  index: number;
  header?: unknown;
};

const Contributions = ({ block }: IContributions) => {
  if (!block) return null;

  const { title, projectListLabel, projectsList } = block;

  return (
    <section>
      <h2>{title}</h2>
      <h3>{projectListLabel}</h3>
      <ul>
        {projectsList?.map((project) => (
          <li key={project._ref}>{project._ref}</li>
        ))}
      </ul>
    </section>
  );
};

export default Contributions;
