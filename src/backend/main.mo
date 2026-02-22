import Text "mo:core/Text";
import OutCall "http-outcalls/outcall";

actor {
  public query func transform(input: OutCall.TransformationInput) : async OutCall.TransformationOutput {
    OutCall.transform(input);
  };

  public shared ({ caller }) func fetchQuranSurah(surahNumber: Nat) : async Text {
    if (surahNumber < 1 or surahNumber > 114) {
      return "Invalid Surah number. Please enter a number between 1 and 114.";
    };
    let url = "https://api.alquran.cloud/v1/surah/" # surahNumber.toText() # "/en.asad";
    await OutCall.httpGetRequest(url, [], transform);
  };

  public shared ({ caller }) func fetchPrayerTimes(city : Text, country : Text) : async Text {
    let url = "https://api.aladhan.com/v1/timingsByCity?city=" # city # "&country=" # country # "&method=2";
    await OutCall.httpGetRequest(url, [], transform);
  };

  public shared ({ caller }) func fetchIslamicCalendar(year : Nat) : async Text {
    let url = "https://api.aladhan.com/v1/gToHCalendar/" # year.toText();
    await OutCall.httpGetRequest(url, [], transform);
  };
};
