import { describe, expect, it } from "vitest";
import {
  blogSchema,
  caseStudySchema,
  careerSchema,
  clientSchema,
  inquiryUpdateSchema,
  partnerSchema,
  testimonialSchema,
} from "@/lib/content-input";

const blog = {
  title: "Title",
  slug: "title",
  excerpt: "Excerpt",
  content: "<p>Hi</p>",
  image: "https://utfs.io/f/abc",
  category: "News",
  author: "ETS",
};

describe("blogSchema", () => {
  it("accepts a valid blog and sanitizes content", () => {
    const parsed = blogSchema.parse({ ...blog, content: "<p>Hi</p><script>alert(1)</script>" });
    expect(parsed.content).not.toContain("<script>");
  });

  it("rejects missing required fields", () => {
    expect(blogSchema.safeParse({ ...blog, title: " " }).success).toBe(false);
  });

  it("rejects an invalid date", () => {
    expect(blogSchema.partial().safeParse({ date: "not-a-date" }).success).toBe(false);
  });

  it("leaves omitted fields undefined on partial updates", () => {
    expect(blogSchema.partial().parse({ title: "New" })).toEqual({ title: "New" });
  });

  it("clears SEO fields given an empty string", () => {
    expect(blogSchema.partial().parse({ seoTitle: "  " }).seoTitle).toBeNull();
  });
});

describe("testimonialSchema", () => {
  it("does not reset rating or isNew on partial updates", () => {
    expect(testimonialSchema.partial().parse({ content: "Great" })).toEqual({ content: "Great" });
  });

  it("only accepts whole-number ratings from 1 to 5", () => {
    expect(testimonialSchema.partial().safeParse({ rating: 4.5 }).success).toBe(false);
    expect(testimonialSchema.partial().safeParse({ rating: 6 }).success).toBe(false);
    expect(testimonialSchema.partial().parse({ rating: "3" }).rating).toBe(3);
  });
});

describe("priority", () => {
  it("keeps 0 and treats empty input as the default", () => {
    expect(clientSchema.partial().parse({ priority: 0 }).priority).toBe(0);
    expect(clientSchema.partial().parse({ priority: null }).priority).toBeUndefined();
    expect(partnerSchema.partial().safeParse({ priority: "abc" }).success).toBe(false);
  });
});

describe("careerSchema", () => {
  it("defaults an empty department to General", () => {
    const parsed = careerSchema.parse({ title: "Tech", department: "", location: "AD", type: "Full-time", description: "x" });
    expect(parsed.department).toBe("General");
  });
});

describe("caseStudySchema", () => {
  it("sanitizes solution HTML", () => {
    const parsed = caseStudySchema.parse({
      project: "P",
      client: "C",
      image: "https://utfs.io/f/abc",
      overview: "",
      solution: { title: "S", html: '<p onclick="x()">ok</p>' },
    });
    expect(JSON.stringify(parsed.solution)).not.toContain("onclick");
  });
});

describe("inquiryUpdateSchema", () => {
  it("only allows known statuses", () => {
    expect(inquiryUpdateSchema.safeParse({ status: "replied" }).success).toBe(true);
    expect(inquiryUpdateSchema.safeParse({ status: "deleted" }).success).toBe(false);
  });
});
