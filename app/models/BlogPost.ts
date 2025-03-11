// lib/models/blog-post.ts
import mongoose, { Schema, model, models } from "mongoose";
import slugify from "slugify";

export interface IBlogPost extends mongoose.Document {
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  coverImage?: string;
  author: string;
  status: "draft" | "published";
  publishDate?: Date;
  readTime?: string;
  tags: string[];
  views: number;
  createdAt: Date;
  updatedAt: Date;
}

const BlogPostSchema = new Schema<IBlogPost>(
  {
    title: {
      type: String,
      required: [true, "Please provide a title"],
      trim: true,
      maxlength: [200, "Title cannot be more than 200 characters"],
    },
    slug: {
      type: String,
      unique: [true, "Slug must be unique"],
    },
    excerpt: {
      type: String,
      required: [true, "Please provide an excerpt"],
      trim: true,
      maxlength: [500, "Excerpt cannot be more than 500 characters"],
    },
    content: {
      type: String,
      required: [true, "Please provide content"],
    },
    coverImage: {
      type: String,
    },
    author: {
      type: String,
      required: [true, "Please provide an author"],
    },
    status: {
      type: String,
      enum: ["draft", "published"],
      default: "draft",
    },
    publishDate: {
      type: Date,
    },
    readTime: {
      type: String,
    },
    tags: {
      type: [String],
      default: [],
    },
    views: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true }
);

// Generate slug from title before saving
BlogPostSchema.pre("save", function (next) {
  if (this.isModified("title")) {
    this.slug = slugify(this.title, { lower: true, strict: true });
  }

  // Set publish date if status changes to published
  if (
    this.isModified("status") &&
    this.status === "published" &&
    !this.publishDate
  ) {
    this.publishDate = new Date();
  }

  next();
});

// Create indexes for better query performance
BlogPostSchema.index({ status: 1, publishDate: -1 });
BlogPostSchema.index({ tags: 1 });

// This approach prevents model recompilation errors in development
// with Next.js hot reloading
const BlogPost =
  models.BlogPost || model<IBlogPost>("BlogPost", BlogPostSchema);

export default BlogPost;
