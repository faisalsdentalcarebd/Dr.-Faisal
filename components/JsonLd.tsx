export default function JsonLd() {
  const schema = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': ['Dentist', 'MedicalBusiness', 'LocalBusiness'],
        '@id': 'https://faisalsdentalcare.com/#organization',
        name: "Faisal's Dental Care",
        url: 'https://faisalsdentalcare.com',
        telephone: '+8801817102030',
        email: 'faisalsdentalcare@gmail.com',
        image: 'https://faisalsdentalcare.com/images/og-image.jpg',
        logo: 'https://faisalsdentalcare.com/images/og-image.jpg',
        description:
          "Expert prosthodontic specialist dental care in Gulshan-1, Dhaka. Dr. Faisal — FICD Fellow, 28 years of experience, internationally trained in Spain, India & Thailand.",
        address: {
          '@type': 'PostalAddress',
          streetAddress: 'House # 50, Road # 03, Block-B, Niketan',
          addressLocality: 'Gulshan-1',
          addressRegion: 'Dhaka',
          postalCode: '1212',
          addressCountry: 'BD',
        },
        geo: {
          '@type': 'GeoCoordinates',
          latitude: 23.7808,
          longitude: 90.4093,
        },
        openingHoursSpecification: [
          {
            '@type': 'OpeningHoursSpecification',
            dayOfWeek: ['Saturday', 'Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday'],
            opens: '16:00',
            closes: '20:00',
          },
        ],
        priceRange: '$$',
        medicalSpecialty: 'Prosthodontics',
        availableService: [
          { '@type': 'MedicalProcedure', name: 'Crown & Bridge Restorations' },
          { '@type': 'MedicalProcedure', name: 'Dental Implants' },
          { '@type': 'MedicalProcedure', name: 'Fixed Orthodontics' },
          { '@type': 'MedicalProcedure', name: 'Root Canal Treatment' },
          { '@type': 'MedicalProcedure', name: 'Dental Scaling & Cleaning' },
          { '@type': 'MedicalProcedure', name: 'Tooth Extraction' },
          { '@type': 'MedicalProcedure', name: 'Dental Fillings' },
        ],
        employee: {
          '@type': 'Physician',
          name: 'Dr. Sheikh Md. Shahriar Quader',
          jobTitle: 'Prosthodontist',
          description:
            'FICD Fellow, Associate Professor & HoD Prosthodontics, Shaheed Suhrawardy Medical College Hospital. 28 years of specialist dental experience.',
          hasCredential: [
            { '@type': 'EducationalOccupationalCredential', credentialCategory: 'degree', name: 'BDS — Dhaka Dental College' },
            { '@type': 'EducationalOccupationalCredential', credentialCategory: 'degree', name: 'MS (Prosthodontics) — Bangladesh Medical University' },
            { '@type': 'EducationalOccupationalCredential', credentialCategory: 'license', name: 'FICD — Fellow, International College of Dentists USA (2019)' },
          ],
        },
        sameAs: [
          'https://www.facebook.com/faisalsdentalcare',
        ],
      },
      {
        '@type': 'WebSite',
        '@id': 'https://faisalsdentalcare.com/#website',
        url: 'https://faisalsdentalcare.com',
        name: "Faisal's Dental Care",
        description: 'Specialist dental care by Dr. Faisal — Prosthodontist in Gulshan-1, Dhaka.',
        potentialAction: {
          '@type': 'SearchAction',
          target: {
            '@type': 'EntryPoint',
            urlTemplate: 'https://faisalsdentalcare.com/blog?q={search_term_string}',
          },
          'query-input': 'required name=search_term_string',
        },
      },
      {
        '@type': 'FAQPage',
        mainEntity: [
          {
            '@type': 'Question',
            name: 'What is a Prosthodontist and how is it different from a regular dentist?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'A Prosthodontist is a dental specialist who has completed additional years of advanced postgraduate training in restoring and replacing teeth — including crowns, bridges, implants, and full-mouth rehabilitation.',
            },
          },
          {
            '@type': 'Question',
            name: 'What are the consulting hours at Faisal\'s Dental Care?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: "Dr. Faisal consults from 4:00 PM to 8:00 PM, Saturday through Thursday. Friday appointments are available by special arrangement.",
            },
          },
          {
            '@type': 'Question',
            name: 'How do I book an appointment with Dr. Faisal?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'You can book an appointment in three ways: fill in the appointment form on this page, call 01817-102030, or email faisalsdentalcare@gmail.com.',
            },
          },
        ],
      },
    ],
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  )
}
