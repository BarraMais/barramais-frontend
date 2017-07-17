import { AdvertiserModel } from "./advertiser.model";

export class UserModel {
  id: number;
  createdAt: Date;
  updatedAt: Date;

  //Account informartion
  avatar: string;
  cover_photo: string;
  avatar_url: string;
  cover_photo_url: string;
  email: string;
  // password: string;
  // password_confirmation: string;
  // current_password: string;
  first_name: string;
  last_name: string;
  nickname: string;

  //Personal information
  sex: string;
  birthday: Date;
  cellphone: string;
  mobile_operator: string;
  about: string;
  academic_profile: string;
  profession: string;
  work: string;
  language: string;
  alternative_email: string;
  facebook: string;
  instagram: string;
  twitter: string;
  linkedin: string;
  website: string;

  //Nautical Information
  nautical_professional: boolean;
  relationship: number;
  relationship_name: number;
  has_embarcation: number;
  nautical_profession_description: string;
  naval_service: number;
  naval_service_patent: number;
  naval_service_patent_name: number;
  advertiser: AdvertiserModel;
  nautical_license: number;
  nautical_license_name: number;
  has_nautical_license: number;
  nautical_tour: boolean;
  fishing: boolean;
  own_vessels: Array<any>;
  own_vessels_id: Array<any>;
  national_trips: string;
  international_trips: string;
  cruise_trips: string;
  nautical_literature: string;
  nautical_application: string;
  nautical_brand: string;
  fishing_tourist: boolean;
  tourist_places: string;
  water_sportsman: boolean;
  fishing_type: number;

  constructor(public params?:any) {
    params = params || {}
    this.id = params.id || null;
    this.createdAt = params.created_at || "";
    this.updatedAt = params.updated_at || 0;
    this.avatar = params.avatar || null;
    this.cover_photo = params.cover_photo || null;
    this.avatar_url = params.avatar_url || "";
    this.cover_photo_url = params.cover_photo_url || "";
    this.first_name = params.first_name || null;
    this.last_name = params.last_name || null;
    this.nickname = params.nickname || null;
    this.sex = params.sex || null;
    this.birthday = params.birthday || null;
    this.cellphone = params.cellphone || "";
    this.about = params.about || "";
    this.academic_profile = params.academic_profile || "";
    this.relationship = params.relationship || null;
    this.relationship_name = params.relationship_name || null;
    this.has_embarcation = params.has_embarcation || false;
    this.nautical_professional = params.nautical_professional || false;
    this.nautical_profession_description = params.nautical_profession_description || "";
    this.naval_service = params.naval_service || false;
    this.naval_service_patent = params.naval_service_patent || null;
    this.naval_service_patent_name = params.naval_service_patent_name || null;
    this.advertiser = params.advertiser || null;
    this.nautical_license = params.nautical_license || null;
    this.nautical_license_name = params.nautical_license_name || null;
    this.has_nautical_license = params.has_nautical_license || false;
    this.work = params.work || "";
    this.nautical_tour = params.nautical_tour || false;
    this.fishing = params.fishing || false;
    this.own_vessels = params.own_vessels || [];
    this.own_vessels_id = [];
    this.profession = params.profession || "";
    this.language = params.language || "";
    this.mobile_operator = params.mobile_operator || "";
    this.email = params.email || "";
    this.alternative_email = params.alternative_email || "";
    this.facebook = params.facebook || "";
    this.instagram = params.instagram || "";
    this.twitter = params.twitter || "";
    this.linkedin = params.linkedin || "";
    this.website = params.website || "";
    this.national_trips = params.national_trips || "";
    this.international_trips = params.international_trips || "";
    this.cruise_trips = params.cruise_trips || "";
    this.nautical_literature = params.nautical_literature || "";
    this.nautical_application = params.nautical_application || "";
    this.nautical_brand = params.nautical_brand || "";
    this.fishing_tourist = params.fishing_tourist || false;
    this.tourist_places = params.tourist_places || "";
    this.water_sportsman = params.water_sportsman || false;
    this.fishing_type = params.fishing_type || 0;

    for (let i = 0; i < this.own_vessels.length; i++) {
      this.own_vessels_id.push(this.own_vessels[i].id);
    }
  }
}
