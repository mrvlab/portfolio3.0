import React from 'react';
import { IContributionsBlock } from '../..';
import { documentDataAttr } from '@/sanity/lib/utils';
import Link from 'next/link';
import CardContent from './CardContent';

type ProjectType = NonNullable<
  NonNullable<IContributionsBlock['projectsList']>[number]
>;

type IProjectCard = {
  project: ProjectType;
  index: number;
  hasPageBuilder?: boolean;
};

const ProjectCard = ({ project, index, hasPageBuilder }: IProjectCard) => {
  if (!project) return null;

  const { _id, _type, slug } = project;
  const projectUrl = `/projects/${slug?.current}`;
  const containerClasses =
    'flex aspect-4/5 justify-center items-center flex-shrink-0 overflow-hidden group relative lg:text-gray-900 lg:dark:text-green-100 text-scale--1 transition-all duration-300 hover:bg-gray-100 dark:hover:bg-green-700';

  const projectDataAttr = documentDataAttr(_id, _type, 'name');

  return hasPageBuilder ? (
    <Link
      key={project._id}
      data-sanity={projectDataAttr}
      href={projectUrl}
      className={containerClasses}
    >
      <CardContent
        project={project}
        index={index}
        hasPageBuilder={hasPageBuilder}
      />
    </Link>
  ) : (
    <div
      key={project._id}
      data-sanity={projectDataAttr}
      className={containerClasses}
    >
      <CardContent
        project={project}
        index={index}
        hasPageBuilder={hasPageBuilder}
      />
    </div>
  );
};

export default ProjectCard;
