import { extractKeyAndSubType } from './video';
import { MEDIA_SUBTYPES_VIDEO } from './media';

const { DAILYMOTION, FACEBOOK, INSTAGRAM, VIMEO, YOUTUBE } = MEDIA_SUBTYPES_VIDEO;

// Inspired by https://github.com/Zod-/jsVideoUrlParser
const dailymotionUrls = [
  'www.dailymotion.com/video/x1e2b95_bruce-lee-nin-kayip-kedisi_animals',
  'www.dailymotion.com/video/x1e2b95',
  'dai.ly/x1e2b95',
  'www.dailymotion.com/embed/video/x1e2b95',
];
const facebookUrls = [
  'www.facebook.com/watch?v=10162168992300290',
  'www.facebook.com/kody.stewart.739/videos/10162168992300290/',
  'www.facebook.com/freshfishfilms/videos/733411660429890/?t=2',
];
const instagramUrls = ['www.instagram.com/p/B1ZRr4flweF/', 'www.instagram.com/p/B1ZRr4flweF/embed'];
const vimeoUrls = ['//vimeo.com/97276391', '//player.vimeo.com/video/97276391'];
const youtubeUrls = [
  'www.youtube.com/watch?v=HRb7B9fPhfA',
  'www.youtube.com/embed/HRb7B9fPhfA',
  'youtu.be/HRb7B9fPhfA',
  'm.youtube.com/details?v=HRb7B9fPhfA',
];

describe('Parsing returns the right data', () => {
  it('should parse Dailymotion urls', () => {
    expect(extractKeyAndSubType(dailymotionUrls[0])).toEqual({
      mediaSubType: DAILYMOTION,
      vendorKey: 'x1e2b95',
    });
    expect(extractKeyAndSubType('http://' + dailymotionUrls[0])).toEqual({
      mediaSubType: DAILYMOTION,
      vendorKey: 'x1e2b95',
    });
    expect(extractKeyAndSubType('https://' + dailymotionUrls[0])).toEqual({
      mediaSubType: DAILYMOTION,
      vendorKey: 'x1e2b95',
    });

    expect(extractKeyAndSubType(dailymotionUrls[1])).toEqual({
      mediaSubType: DAILYMOTION,
      vendorKey: 'x1e2b95',
    });
    expect(extractKeyAndSubType('http://' + dailymotionUrls[1])).toEqual({
      mediaSubType: DAILYMOTION,
      vendorKey: 'x1e2b95',
    });
    expect(extractKeyAndSubType('https://' + dailymotionUrls[1])).toEqual({
      mediaSubType: DAILYMOTION,
      vendorKey: 'x1e2b95',
    });

    expect(extractKeyAndSubType(dailymotionUrls[2])).toEqual({
      mediaSubType: DAILYMOTION,
      vendorKey: 'x1e2b95',
    });
    expect(extractKeyAndSubType('http://' + dailymotionUrls[2])).toEqual({
      mediaSubType: DAILYMOTION,
      vendorKey: 'x1e2b95',
    });
    expect(extractKeyAndSubType('https://' + dailymotionUrls[2])).toEqual({
      mediaSubType: DAILYMOTION,
      vendorKey: 'x1e2b95',
    });

    expect(extractKeyAndSubType(dailymotionUrls[3])).toEqual({
      mediaSubType: DAILYMOTION,
      vendorKey: 'x1e2b95',
    });
    expect(extractKeyAndSubType('http://' + dailymotionUrls[3])).toEqual({
      mediaSubType: DAILYMOTION,
      vendorKey: 'x1e2b95',
    });
    expect(extractKeyAndSubType('https://' + dailymotionUrls[3])).toEqual({
      mediaSubType: DAILYMOTION,
      vendorKey: 'x1e2b95',
    });
  });

  it('should parse Facebook urls', () => {
    expect(extractKeyAndSubType(facebookUrls[0])).toEqual({
      mediaSubType: FACEBOOK,
      vendorKey: '10162168992300290',
    });
    expect(extractKeyAndSubType('http://' + facebookUrls[0])).toEqual({
      mediaSubType: FACEBOOK,
      vendorKey: '10162168992300290',
    });
    expect(extractKeyAndSubType('https://' + facebookUrls[0])).toEqual({
      mediaSubType: FACEBOOK,
      vendorKey: '10162168992300290',
    });

    expect(extractKeyAndSubType(facebookUrls[1])).toEqual({
      mediaSubType: FACEBOOK,
      vendorKey: '10162168992300290',
    });
    expect(extractKeyAndSubType('http://' + facebookUrls[1])).toEqual({
      mediaSubType: FACEBOOK,
      vendorKey: '10162168992300290',
    });
    expect(extractKeyAndSubType('https://' + facebookUrls[1])).toEqual({
      mediaSubType: FACEBOOK,
      vendorKey: '10162168992300290',
    });

    expect(extractKeyAndSubType(facebookUrls[2])).toEqual({
      mediaSubType: FACEBOOK,
      vendorKey: '733411660429890',
    });
    expect(extractKeyAndSubType('http://' + facebookUrls[2])).toEqual({
      mediaSubType: FACEBOOK,
      vendorKey: '733411660429890',
    });
    expect(extractKeyAndSubType('https://' + facebookUrls[2])).toEqual({
      mediaSubType: FACEBOOK,
      vendorKey: '733411660429890',
    });
  });

  it('should parse Instagram urls', () => {
    expect(extractKeyAndSubType(instagramUrls[0])).toEqual({
      mediaSubType: INSTAGRAM,
      vendorKey: 'B1ZRr4flweF',
    });
    expect(extractKeyAndSubType('http://' + instagramUrls[0])).toEqual({
      mediaSubType: INSTAGRAM,
      vendorKey: 'B1ZRr4flweF',
    });
    expect(extractKeyAndSubType('https://' + instagramUrls[0])).toEqual({
      mediaSubType: INSTAGRAM,
      vendorKey: 'B1ZRr4flweF',
    });

    expect(extractKeyAndSubType(instagramUrls[1])).toEqual({
      mediaSubType: INSTAGRAM,
      vendorKey: 'B1ZRr4flweF',
    });
    expect(extractKeyAndSubType('http://' + instagramUrls[1])).toEqual({
      mediaSubType: INSTAGRAM,
      vendorKey: 'B1ZRr4flweF',
    });
    expect(extractKeyAndSubType('https://' + instagramUrls[1])).toEqual({
      mediaSubType: INSTAGRAM,
      vendorKey: 'B1ZRr4flweF',
    });
  });

  it('should parse Vimeo urls', () => {
    expect(extractKeyAndSubType(vimeoUrls[0])).toEqual({
      mediaSubType: VIMEO,
      vendorKey: '97276391',
    });
    expect(extractKeyAndSubType('http://' + vimeoUrls[0])).toEqual({
      mediaSubType: VIMEO,
      vendorKey: '97276391',
    });
    expect(extractKeyAndSubType('https://' + vimeoUrls[0])).toEqual({
      mediaSubType: VIMEO,
      vendorKey: '97276391',
    });

    expect(extractKeyAndSubType(vimeoUrls[1])).toEqual({
      mediaSubType: VIMEO,
      vendorKey: '97276391',
    });
    expect(extractKeyAndSubType('http://' + vimeoUrls[1])).toEqual({
      mediaSubType: VIMEO,
      vendorKey: '97276391',
    });
    expect(extractKeyAndSubType('https://' + vimeoUrls[1])).toEqual({
      mediaSubType: VIMEO,
      vendorKey: '97276391',
    });
  });

  it('should parse YouTube urls', () => {
    expect(extractKeyAndSubType(youtubeUrls[0])).toEqual({
      mediaSubType: YOUTUBE,
      vendorKey: 'HRb7B9fPhfA',
    });
    expect(extractKeyAndSubType('http://' + youtubeUrls[0])).toEqual({
      mediaSubType: YOUTUBE,
      vendorKey: 'HRb7B9fPhfA',
    });
    expect(extractKeyAndSubType('https://' + youtubeUrls[0])).toEqual({
      mediaSubType: YOUTUBE,
      vendorKey: 'HRb7B9fPhfA',
    });

    expect(extractKeyAndSubType(youtubeUrls[1])).toEqual({
      mediaSubType: YOUTUBE,
      vendorKey: 'HRb7B9fPhfA',
    });
    expect(extractKeyAndSubType('http://' + youtubeUrls[1])).toEqual({
      mediaSubType: YOUTUBE,
      vendorKey: 'HRb7B9fPhfA',
    });
    expect(extractKeyAndSubType('https://' + youtubeUrls[1])).toEqual({
      mediaSubType: YOUTUBE,
      vendorKey: 'HRb7B9fPhfA',
    });

    expect(extractKeyAndSubType(youtubeUrls[2])).toEqual({
      mediaSubType: YOUTUBE,
      vendorKey: 'HRb7B9fPhfA',
    });
    expect(extractKeyAndSubType('http://' + youtubeUrls[2])).toEqual({
      mediaSubType: YOUTUBE,
      vendorKey: 'HRb7B9fPhfA',
    });
    expect(extractKeyAndSubType('https://' + youtubeUrls[2])).toEqual({
      mediaSubType: YOUTUBE,
      vendorKey: 'HRb7B9fPhfA',
    });

    expect(extractKeyAndSubType(youtubeUrls[3])).toEqual({
      mediaSubType: YOUTUBE,
      vendorKey: 'HRb7B9fPhfA',
    });
    expect(extractKeyAndSubType('http://' + youtubeUrls[3])).toEqual({
      mediaSubType: YOUTUBE,
      vendorKey: 'HRb7B9fPhfA',
    });
    expect(extractKeyAndSubType('https://' + youtubeUrls[3])).toEqual({
      mediaSubType: YOUTUBE,
      vendorKey: 'HRb7B9fPhfA',
    });
  });
});
