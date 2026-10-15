-- CreateIndex
CREATE INDEX "Blog_published_createdAt_idx" ON "Blog"("published", "createdAt");

-- CreateIndex
CREATE INDEX "CaseStudy_isFeatured_priority_createdAt_idx" ON "CaseStudy"("isFeatured", "priority", "createdAt");

-- CreateIndex
CREATE INDEX "Partner_priority_idx" ON "Partner"("priority");

-- CreateIndex
CREATE INDEX "Client_priority_idx" ON "Client"("priority");

-- CreateIndex
CREATE INDEX "Inquiry_createdAt_idx" ON "Inquiry"("createdAt");

-- CreateIndex
CREATE INDEX "Application_createdAt_idx" ON "Application"("createdAt");
