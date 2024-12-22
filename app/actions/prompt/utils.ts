export const addFields = {
  score: {
    $meta: "searchScore",
  },
};

// export const should = (q: string) => {
//   return [
//     {
//       text: {
//         query: q,
//         path: {
//           wildcard: "*",
//         },
//         fuzzy: {
//           maxEdits: 2,
//           prefixLength: 3,
//         },
//       },
//     },
//   ];
// };

export const should = (q: string) => {
  return [
    {
      autocomplete: { query: q, path: "title", score: { boost: { value: 5 } } },
    },

    {
      text: { query: q, path: "description" },
    },
  ];
};

export const lg0Match = {
  score: { $gt: 0 },
};

export const project = {
  id: "$_id",
  title: 1,
  description: 1,
  category: 1,
  icon: 1,
  userId: 1,
  shared: 1,
};
