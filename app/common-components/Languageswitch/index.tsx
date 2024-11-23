export default function LanguageSwitch() {
  const languages = [
    { name: "hi", title: " हिन्दी" },
    { name: "bn", title: "বাংলা" },
    { name: "te", title: "తెలుగు" },
    { name: "mr", title: "मराठी" },
    { name: "ta", title: "தமிழ்" },
    { name: "gu", title: "ગુજરાતી" },
    { name: "kn", title: "ಕನ್ನಡ" },
    { name: "ml", title: "മലയാളം" },
    { name: "pa", title: "ਪੰਜਾਬੀ" },
  ];

  return (
    <div className="text-[13px]">
      Google offered in:
      {languages.map((language, index) => (
        <span key={language.name}>
          <a
            href={`#${language.name}`}
            className="text-blue-600 hover:underline px-[3px]"
          >
            {language.title}
          </a>
          {index < languages.length - 1 && " "}
        </span>
      ))}
    </div>
  );
}
