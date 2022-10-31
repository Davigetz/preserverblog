const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

async function main() {
  //   const category = await prisma.category.create({
  //     data: [
  //       { name: "Dog", slug: "Pets" },
  //       {
  //         name: "Cats",
  //         slug: "Pets",
  //       },
  //     ],
  //   });
  const post = await prisma.post.create({
    data: {
      title: "Pets Care",
      slug: "Pets",
      excerpt:
        "The importance of pets needs best food's in market for that reason with look for...",
      content:
        "We love Pets as we love more we invest more in them. So what is the suplement than need more. Let's talk about it right now.",
      featureImage:
        "https://res.cloudinary.com/davigetz/image/upload/v1665636494/IMG_20221012_151644_yoxpay.jpg",
      featurePot: true,
    },
  });
  const category = await prisma.category.create({
    data: {
      name: "Dogs",
      slug: "Pets",
    },
  });
  const author = await prisma.author.create({
    data: {
      name: "David",
      bio: "I am a person with many desires and few time",
      photo:
        "https://res.cloudinary.com/davigetz/image/upload/v1664422240/ul4xxlmrshjes4pz0zdt.jpg",
    },
  });
  const postAuthor = await prisma.postauthor.create({
    data: {
      postId: post.id,
      authorId: author.id,
    },
  });
  const postcategory = await prisma.postCategory.create({
    data: {
      postId: post.id,
      cateogryId: category.id,
    },
  });
  console.log(postcategory);
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
