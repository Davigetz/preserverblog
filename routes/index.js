const { Router } = require("express");
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const router = Router();

router.get("/posts", async (req, res) => {
  try {
    const posts = await prisma.post.findMany({
      include: {
        postauthor: {
          include: {
            author: true,
          },
        },
        postCategory: {
          include: {
            category: true,
          },
        },
      },
    });
    res.send(posts);
  } catch (error) {
    console.log(error);
  }
});

router.get("/post/:slug", async (req, res) => {
  try {
    const { slug } = req.params;
    console.log(slug);
    const post = await prisma.post.findMany({
      where: { slug: { equals: slug } },
      include: {
        postauthor: {
          include: {
            author: true,
          },
        },
        postCategory: {
          include: {
            category: true,
          },
        },
      },
    });
    console.log(post);
    if (post.lenght === 0) {
      throw new Error("No se encontro");
    }
    res.send(post);
  } catch (error) {
    console.log(error);
    res.status(404).json({ error: error.Error });
  }
});

router.get("/recentposts", async (req, res) => {
  try {
    const recent = await prisma.post.findMany({
      take: 3,
      orderBy: {
        addedAt: "asc",
      },
      include: {
        postCategory: {
          include: {
            category: true,
          },
        },
      },
    });
    res.send(recent);
  } catch (error) {
    console.log(error);
  }
});

router.get("/categories", async (req, res) => {
  try {
    const cates = await prisma.category.findMany({});
    res.send(cates);
  } catch (error) {
    console.log(error);
  }
});

router.post("/comment", async (req, res) => {
  try {
    // falta autenticacion
    const { name, email, comment, slug } = req.body;

    console.log(name);
    // json validate
    // with email re check

    const comments = await prisma.comment.create({
      data: {
        name,
        comment,
      },
    });

    res.send(comments);
  } catch (error) {
    console.log(error);
  }
});

module.exports = router;
