const posts = [
  {
    img: 'https://s3-alpha-sig.figma.com/img/10eb/cad8/e6009416f2009943b9cd5d7f02695269?Expires=1690156800&Signature=VSCzi-BcFOWspTQdq8mEEk~TO27hB1Z3ozijmNULALmuZ~SMjWyYQptTRH6RQAM-0rOQXniwWzvIXLpye0boyktL8M4hH5QIlnHQOf10Lzmuhm4csJdonEBvs-Si1F2Vaw-GcpoFRi-rDYQmoexF2r2L9xNBETSptCT00y78Ga0MgLvSrbuR2De~dUQm1DdFLVZYnb6~X3MVfVZCDQDSYhkzGgfH2xCimK9sY8TeUKx-W5Q0YHVgJ4DctxExgEkwJ2f0d9VHvnnKvt6KY~FkWoBxDPYhtxhv08FDjqMWhH36xD49aspPYbk8DGRRDlWdCm1uDP9-PxSmbEJb6EDdVw__&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4',
    description: '123',
    comments: [
      {
        author: 'user1',
        text: 'Really love your most recent photo. I’ve been trying to capture the same thing for a few months and would love some tips!',
        date: '09 червня, 2020 | 09:20',
      },
      {
        author: 'owner',
        text: 'A fast 50mm like f1.8 would help with the bokeh. I’ve been using primes as they tend to get a bit sharper images.',
        date: '09 червня, 2020 | 09:20',
      },
      {
        author: 'user1',
        text: 'Thank you! That was very helpful!',
        date: '09 червня, 2020 | 09:20',
      },
    ],
    likes: 50,
    locationName: 'Ukraine',
    geoLocation: { latitude: 49.2714836, longitude: 23.8227551 },
  },
];

export default posts;
