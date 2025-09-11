import React from 'react';
import { IContributionsBlock } from '../index';
import ProjectCard from './ProjectCard';
import Link from 'next/link';

type IProjectsList = {
  projectsList: NonNullable<IContributionsBlock['projectsList']>;
};

const Projects = ({ projectsList }: IProjectsList) => {
  if (!projectsList) return null;

  return (
    <>
      {projectsList.map((project, index) => {
        const { pageBuilder } = project;
        const hasPageBuilder = pageBuilder?.length && pageBuilder?.length > 0;
        const projectUrl = `/projects/${project.slug?.current}`;
        const containerClasses =
          'group relative flex items-center justify-center aspect-4/5 text-gray-900 hover:bg-gray-100 dark:text-green-100 dark:hover:bg-green-700 transition-all duration-300 text-scale--1 md:h-full';

        return (
          <li key={project._id}>
            {hasPageBuilder ? (
              <Link href={projectUrl} className={containerClasses}>
                <ProjectCard
                  key={project._id}
                  project={project}
                  index={index}
                  hasPageBuilder={hasPageBuilder}
                />
              </Link>
            ) : (
              <div className={containerClasses}>
                <ProjectCard
                  key={project._id}
                  project={project}
                  index={index}
                />
              </div>
            )}
          </li>
        );
      })}
    </>
  );
};

export default Projects;
