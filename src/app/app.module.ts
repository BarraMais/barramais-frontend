import { NgModule, ErrorHandler } from '@angular/core';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { BrowserModule } from '@angular/platform-browser';
import { MyApp } from './app.component';
import { FeedsPage } from '../pages/feeds/feeds';
import { GroupsPage } from '../pages/groups/groups';
import { PopoverPage } from '../pages/groups/group-popover';
import { EventsPage } from '../pages/events/events';
import { UserPage } from '../pages/user/user';
import { EditPasswordPage } from '../pages/user/edit-password';
import { User } from '../providers/user';
import { Routes } from '../providers/routes';
import { EventProvider } from '../providers/events';
import { Groups } from '../providers/groups';
import { RegistrationPage } from '../pages/registration/registration';
import { HomePage } from '../pages/home/home';
import { MainPage } from '../pages/main/main';
import { PostModalPage } from '../pages/post-modal/post-modal';
import { CommentModalPage } from '../pages/comment-modal/comment-modal';
import { EventModalPage } from '../pages/events/event-modal';
import { EventGuestsPage } from '../pages/events/event-guests';
import { EventPagePage } from '../pages/events/event-page';
import { GroupModalPage } from '../pages/groups/group-modal';
import { GroupUpdatePage } from '../pages/groups/group-update';
import { GroupMembersPage } from '../pages/groups/group-members';
import { AddGroupMembersPage } from '../pages/groups/add-group-members';
import { GalleryModalPage } from '../pages/gallery-modal/gallery-modal';
import { PhotoModalPage } from '../pages/photo-modal/photo-modal';
import { GroupPagePage } from '../pages/groups/group-page';
import { ElasticHeader } from '../components/elastic-header/elastic-header';
import { ProfilePage } from '../pages/profile/profile';
import { FriendsPage } from '../pages/friends/friends';
import { FriendshipRequestPage } from '../pages/friendship-request/friendship-request';
import { LoginPage } from '../pages/login/login';
import { ForgotPasswordPage } from '../pages/login/forgot-password';
import { AuthHttp, AuthConfig } from 'angular2-jwt';
import { Http } from '@angular/http';
import { HttpModule } from '@angular/http';
import { BmHeaderComponent } from '../components/bm-header/bm-header';
import { BmPostComponent } from '../components/bm-post/bm-post';
import { Mask } from '../components/mask/mask';
import { AdvertiserPage } from '../pages/advertiser/advertiser';
import { PrivacyPage } from '../pages/privacy/privacy';
import { TermsPage } from '../pages/terms/terms';
import { Advertiser } from '../providers/advertiser';
import { AdsPage } from '../pages/ads/ads';
import { Ads } from '../providers/ads';
import { ConversationPage } from '../pages/conversation/conversation';
import { Conversations } from '../providers/conversations';
import { ConversationChannel } from '../providers/conversation-channel';
import { MessagesPage } from '../pages/messages/messages';
import { MidiaKitPage } from '../pages/midia-kit/midia-kit';
import { HelpPage } from '../pages/help/help';
import { AlbumListPage } from '../pages/album-list/album-list';
import { AlbumPhotoCreatePage } from '../pages/album-photo-create/album-photo-create';
import { AdBannersPage } from '../pages/ad-banners/ad-banners';
import { AdInterestsPage } from '../pages/ad-interests/ad-interests';
import { AdDescriptionsPage } from '../pages/ad-descriptions/ad-descriptions';
import { AdPreviewPage } from '../pages/ad-preview/ad-preview';
import { BmPostLikesPage } from '../pages/bm-post-likes/bm-post-likes';
import { AdListPage } from '../pages/ad-list/ad-list';
import { AdvertisersPage } from '../pages/advertisers/advertisers';
import { AdvertiserPaymentPage } from '../pages/advertiser-payment/advertiser-payment';
import { ClassifiedUserListPage } from '../pages/classified-user-list/classified-user-list';
import { Classified } from '../providers/classified';
import { ClassifiedPage } from '../pages/classified/classified';
import { ClassifiedVesselTypePage } from '../pages/classified-vessel-type/classified-vessel-type';
import { ClassifiedVesselStatusPage } from '../pages/classified-vessel-status/classified-vessel-status';
import { ClassifiedVesselManufacturerPage } from '../pages/classified-vessel-manufacturer/classified-vessel-manufacturer';
import { ClassifiedVesselAccessoriesPage } from '../pages/classified-vessel-accessories/classified-vessel-accessories';
import { ClassifiedVesselDescriptionPage } from '../pages/classified-vessel-description/classified-vessel-description';
import { ClassifiedVesselPreviewPage } from '../pages/classified-vessel-preview/classified-vessel-preview';
import { ClassifiedFishingPage } from '../pages/classified-fishing/classified-fishing';
import { ClassifiedFishingStatusPage } from '../pages/classified-fishing-status/classified-fishing-status';
import { ClassifiedFishingDescriptionPage } from '../pages/classified-fishing-description/classified-fishing-description';
import { ClassifiedFishingPreviewPage } from '../pages/classified-fishing-preview/classified-fishing-preview';
import { ClassifiedProductCategoryPage } from '../pages/classified-product-category/classified-product-category';
import { ClassifiedProductStatusPage } from '../pages/classified-product-status/classified-product-status';
import { ClassifiedProductDescriptionPage } from '../pages/classified-product-description/classified-product-description';
import { ClassifiedProductPreviewPage } from '../pages/classified-product-preview/classified-product-preview';
import { ClassifiedShowFishingsPage } from '../pages/classified-show-fishings/classified-show-fishings';
import { ClassifiedShowProductsPage } from '../pages/classified-show-products/classified-show-products';
import { ClassifiedShowVesselsPage } from '../pages/classified-show-vessels/classified-show-vessels';
import { UserPopover } from '../pages/user-popover/user-popover';
import { AddUsersPage } from '../pages/users/add-users';
import { UsersPage } from '../pages/users/users';
import { Posts } from '../providers/posts';
import { Camera } from '@ionic-native/camera';
import { PhotoViewer } from '@ionic-native/photo-viewer';
import { NativePageTransitions } from '@ionic-native/native-page-transitions';
import { InterestSelectionPage } from '../pages/interest-selection/interest-selection';
import { Facebook } from '@ionic-native/facebook';
import { NotificationsPage } from "../pages/notifications/notifications";
import { NotificationViewPage } from '../pages/notification-view/notification-view';
import { Search } from '../providers/search';

export function getAuthHttp(http) {
  return new AuthHttp(new AuthConfig({
    noJwtError: true,
    globalHeaders: [{'Accept': 'application/json', 'Content-Type': 'application/json'}],
    tokenGetter: (() => localStorage.getItem('jwt')),
  }), http);
}

@NgModule({
  declarations: [
    MyApp,
    FeedsPage,
    GroupsPage,
    EventsPage,
    UserPage,
    EditPasswordPage,
    RegistrationPage,
    HomePage,
    MainPage,
    PostModalPage,
    CommentModalPage,
    EventModalPage,
    EventGuestsPage,
    EventPagePage,
    ElasticHeader,
    ProfilePage,
    FriendsPage,
    FriendshipRequestPage,
    LoginPage,
    HelpPage,
    ForgotPasswordPage,
    BmHeaderComponent,
    BmPostComponent,
    AdvertiserPage,
    AdsPage,
    TermsPage,
    PrivacyPage,
    ConversationPage,
    MessagesPage,
    MidiaKitPage,
    AlbumListPage,
    AlbumPhotoCreatePage,
    AdBannersPage,
    AdInterestsPage,
    AdDescriptionsPage,
    AdPreviewPage,
    AdListPage,
    AdvertisersPage,
    AdvertiserPaymentPage,
    ClassifiedUserListPage,
    ClassifiedPage,
    ClassifiedVesselTypePage,
    ClassifiedVesselStatusPage,
    ClassifiedVesselManufacturerPage,
    ClassifiedVesselAccessoriesPage,
    ClassifiedVesselDescriptionPage,
    ClassifiedVesselPreviewPage,
    ClassifiedFishingPage,
    ClassifiedFishingStatusPage,
    ClassifiedFishingDescriptionPage,
    ClassifiedFishingPreviewPage,
    ClassifiedProductCategoryPage,
    ClassifiedProductStatusPage,
    ClassifiedProductDescriptionPage,
    ClassifiedProductPreviewPage,
    ClassifiedShowFishingsPage,
    ClassifiedShowProductsPage,
    ClassifiedShowVesselsPage,
    UserPopover,
    AddUsersPage,
    UsersPage,
    GroupModalPage,
    GroupMembersPage,
    GroupPagePage,
    GalleryModalPage,
    InterestSelectionPage,
    NotificationsPage,
    AddGroupMembersPage,
    PopoverPage,
    PhotoModalPage,
    NotificationViewPage,
    GroupUpdatePage,
    BmPostLikesPage,
    Mask
  ],
  imports: [
    BrowserModule,
    HttpModule,
    IonicModule.forRoot(MyApp, {
      backButtonText: '',
      platforms : {
            ios: { statusbarPadding: true }
      }
    })    
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    FeedsPage,
    GroupsPage,
    EventsPage,
    UserPage,
    EditPasswordPage,
    RegistrationPage,
    HomePage,
    MainPage,
    PostModalPage,
    CommentModalPage,
    EventModalPage,
    EventGuestsPage,
    EventPagePage,
    ProfilePage,
    FriendsPage,
    FriendshipRequestPage,
    HelpPage,
    LoginPage,
    ForgotPasswordPage,
    BmHeaderComponent,
    BmPostComponent,
    AdvertiserPage,
    AdsPage,
    TermsPage,
    PrivacyPage,
    ConversationPage,
    MessagesPage,
    MidiaKitPage,
    AlbumListPage,
    AlbumPhotoCreatePage,
    AdBannersPage,
    AdInterestsPage,
    AdDescriptionsPage,
    AdPreviewPage,
    AdListPage,
    AdvertisersPage,
    AdvertiserPaymentPage,
    ClassifiedUserListPage,
    ClassifiedPage,
    ClassifiedVesselTypePage,
    ClassifiedVesselStatusPage,
    ClassifiedVesselManufacturerPage,
    ClassifiedVesselAccessoriesPage,
    ClassifiedVesselDescriptionPage,
    ClassifiedVesselPreviewPage,
    ClassifiedFishingPage,
    ClassifiedFishingStatusPage,
    ClassifiedFishingDescriptionPage,
    ClassifiedFishingPreviewPage,
    ClassifiedProductCategoryPage,
    ClassifiedProductStatusPage,
    ClassifiedProductDescriptionPage,
    ClassifiedProductPreviewPage,
    ClassifiedShowFishingsPage,
    ClassifiedShowProductsPage,
    ClassifiedShowVesselsPage,
    UserPopover,
    AddUsersPage,
    UsersPage,
    GroupModalPage,
    GroupMembersPage,
    GroupPagePage,
    GalleryModalPage,
    InterestSelectionPage,
    NotificationsPage,
    AddGroupMembersPage,
    PopoverPage,
    PhotoModalPage,
    NotificationViewPage,
    GroupUpdatePage,
    BmPostLikesPage
  ],
  providers: [
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    User,
    StatusBar,
    SplashScreen,
    EventProvider,
    Advertiser,
    Ads,
    Conversations,
    ConversationChannel,
    Classified,
    Posts,
    Groups,
    Routes,
    Camera,
    PhotoViewer,
    NativePageTransitions,
    Facebook,
    Search,
    {provide: AuthHttp, useFactory: getAuthHttp, deps: [Http]}
  ]
})
export class AppModule {}
