import React from 'react';
import { IContributionsBlock } from '../index';
import ProjectCard from './ProjectCard';
import Link from 'next/link';
import { motion } from 'motion/react';
import { documentDataAttr } from '@/sanity/lib/utils';

type IProjectsList = {
  projectsList: NonNullable<IContributionsBlock['projectsList']>;
};

const Projects = ({ projectsList }: IProjectsList) => {
  if (!projectsList) return null;

  return (
    <>
      {projectsList.map((project, index) => {
        const { pageBuilder, _id, _type } = project;
        const hasPageBuilder = pageBuilder?.length && pageBuilder?.length > 0;
        const projectUrl = `/projects/${project.slug?.current}`;
        const containerClasses =
          'group relative flex items-center justify-center aspect-4/5 max-lg:bg-gray-100 max-lg:dark:bg-green-700 lg:text-gray-900 hover:bg-gray-100 lg:dark:text-green-100 dark:hover:bg-green-700 transition-all duration-300 text-scale--1 md:h-full';

        // Create data attributes for Sanity presentation tool highlighting
        const projectDataAttr = documentDataAttr(_id, _type, 'name');

        return (
          <motion.li
            key={project._id}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: index * 0.2 + 0.6, duration: 0.5 }}
            data-sanity={projectDataAttr}
          >
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
          </motion.li>
        );
      })}
    </>
  );
};

export default Projects;
