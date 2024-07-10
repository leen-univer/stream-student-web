import { TestKnowledgeHero } from "components/home";
import { PublicLayout } from "layouts";
import React from "react";

const knowledgeTest = () => {
  return (
    <PublicLayout title="Knowledge Test | StreamStudent">
      <TestKnowledgeHero />
    </PublicLayout>
  );
};

export default knowledgeTest;
