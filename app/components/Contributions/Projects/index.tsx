import React from 'react';
import { IContributionsBlock } from '../index';
import ProjectCard from './ProjectCard';

type IProjectsList = {
  projectsList: NonNullable<IContributionsBlock['projectsList']>;
};

const Projects = ({ projectsList }: IProjectsList) => {
  if (!projectsList) return null;

  return (
    <>
      {projectsList.map((project, index) => {
        const hasPageBuilder = Boolean(
          project.pageBuilder?.length && project.pageBuilder?.length > 0
        );
        return (
          <ProjectCard
            key={`${project._id}-${project.slug?.current || project.name || index}`}
            project={project}
            index={index}
            hasPageBuilder={hasPageBuilder}
          />
        );
      })}
    </>
  );
};

export default Projects;
