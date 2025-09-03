'use client';
import React from 'react';
import { LogoImage } from '../ui/OptimizedImage';

export default function LogoScrollSection() {
  const topRowLogos = [
    {
      name: 'Allen Institute',
      logo: 'https://cdn.prod.website-files.com/65b8f36fa600366bc7cf9a67/66ac91eacab6e5612814add9_Vector.png',
      color: 'bg-blue-500'
    },
    {
      name: 'Google AI',
      logo: 'https://cdn.prod.website-files.com/65b8f36fa600366bc7cf9a67/6683bac27ab6738da91466dd_Group%201000007783.svg',
      color: 'bg-red-500'
    },
    {
      name: 'Microsoft',
      logo: 'https://cdn.prod.website-files.com/65b8f36fa600366bc7cf9a67/6683ba99f86f2b87e4f237fb_Group%201000007780.svg',
      color: 'bg-blue-600'
    },
    {
      name: 'Mistral AI',
      logo: 'https://cdn.prod.website-files.com/65b8f36fa600366bc7cf9a67/6683bac32e6117c63a426294_Group%201000007784.svg',
      color: 'bg-orange-500'
    },
    {
      name: 'Meta AI',
      logo: 'https://cdn.prod.website-files.com/65b8f36fa600366bc7cf9a67/6683c6bb875f1845806550e9_Group%201799369455d.svg',
      color: 'bg-blue-700'
    },
    {
      name: 'Anthropic',
      logo: 'https://cdn.prod.website-files.com/65b8f36fa600366bc7cf9a67/6676e78304740?1d212c9e8f0_logo_icon.svg',
      color: 'bg-purple-500'
    },
    {
      name: 'Stability AI',
      logo: 'https://cdn.prod.website-files.com/65b8f36fa600366bc7cf9a67/6683c33b42155f8095abea24_8e5365de-b40b-48ab-8116-2c9923bb5b99%20copy.svg',
      color: 'bg-green-500'
    },
    {
      name: 'Open AI',
      logo: 'https://cdn.prod.website-files.com/65b8f36fa600366bc7cf9a67/6683bac3f9bd6412dc6d3f5b_Group%201000007781.svg',
      color: 'bg-emerald-500'
    },
    {
      name: 'BigCode',
      logo: 'https://cdn.prod.website-files.com/65b8f36fa600366bc7cf9a67/66ac91dc59a8176025a3e09d_6683bb3265e24a89c1902484_Group%201000007787.png',
      color: 'bg-indigo-500'
    },
    {
      name: 'Alignment Lab',
      logo: 'https://cdn.prod.website-files.com/65b8f36fa600366bc7cf9a67/6683c2a1f8d19da9ed673df0_Group%201000007776.svg',
      color: 'bg-pink-500'
    },
    {
      name: 'Cognitive Computations',
      logo: 'https://cdn.prod.website-files.com/65b8f36fa600366bc7cf9a67/6683b8efceae8eb917768b12_hd3QCLnAkFFGI07Z5d1Ol.webp',
      color: 'bg-cyan-500'
    },
    {
      name: 'Deepgram',
      logo: 'https://cdn.prod.website-files.com/65b8f36fa600366bc7cf9a67/6683c258b6290985056f5cfb_deepgram_logo.svg',
      color: 'bg-teal-500'
    },
    {
      name: 'Undi95',
      logo: 'https://cdn.prod.website-files.com/65b8f36fa600366bc7cf9a67/6683b8ef6ab24b0120359c97_shjRx3yOP2eQvIyOWsQYV.webp',
      color: 'bg-violet-500'
    }
  ];

  const bottomRowLogos = [
    {
      name: 'Teknium',
      logo: 'https://cdn.prod.website-files.com/65b8f36fa600366bc7cf9a67/6683c2658d56cda657c3235d_erOwgMXc_CZih3uMoyTAp.svg',
      color: 'bg-yellow-500'
    },
    {
      name: 'TII',
      logo: 'https://cdn.prod.website-files.com/65b8f36fa600366bc7cf9a67/6683c274491f1bbdc73c97d8_9d873ceb-3426-46e8-b935-32e2301d4828.svg',
      color: 'bg-red-600'
    },
    {
      name: 'Wavymulder',
      logo: 'https://cdn.prod.website-files.com/65b8f36fa600366bc7cf9a67/6683b8ef58aa95f9f02e5671_1669782594616-63068b1141bf1fbadaf08ff1.webp',
      color: 'bg-blue-400'
    },
    {
      name: 'OpenChat',
      logo: 'https://cdn.prod.website-files.com/65b8f36fa600366bc7cf9a67/6683b8ef27ae0705ccd207f8_bbSODuJyPwH5HKOC6RBVc.webp',
      color: 'bg-green-600'
    },
    {
      name: 'NousResearch',
      logo: 'https://cdn.prod.website-files.com/65b8f36fa600366bc7cf9a67/6683c385d82b6d1f02545d59_tPLjYEeP6q1w0j_G2TJG_.svg',
      color: 'bg-purple-600'
    },
    {
      name: 'Austism',
      logo: 'https://cdn.prod.website-files.com/65b8f36fa600366bc7cf9a67/6683b8ef98117f1dc257dd5e_T_J4xxgaVC2CuzPE1VRbe.webp',
      color: 'bg-indigo-600'
    },
    {
      name: 'LAION',
      logo: 'https://cdn.prod.website-files.com/65b8f36fa600366bc7cf9a67/6683b8ef0a85272606a8264e_LAION_logo.webp',
      color: 'bg-pink-600'
    },
    {
      name: 'DeepSeek',
      logo: 'https://cdn.prod.website-files.com/65b8f36fa600366bc7cf9a67/6683c3671822ccf54e14247e_xMBly9PUMphrFVMxLX4kq.svg',
      color: 'bg-cyan-600'
    },
    {
      name: 'Hugging Face',
      logo: 'https://cdn.prod.website-files.com/65b8f36fa600366bc7cf9a67/66ac9178721caf9fcb31dadb_6683bb33a52384168b9c06c6_Group%201000007788.png',
      color: 'bg-yellow-600'
    },
    {
      name: 'Databricks',
      logo: 'https://cdn.prod.website-files.com/65b8f36fa600366bc7cf9a67/6683bb32b048168509806240_channels4_profile.svg',
      color: 'bg-orange-600'
    },
    {
      name: 'Eleuther AI',
      logo: 'https://cdn.prod.website-files.com/65b8f36fa600366bc7cf9a67/6683bc49875f1845805f15fe_720bc4bf-0bcb-445c-b403-ec7d9eb49841%202.svg',
      color: 'bg-teal-600'
    },
    {
      name: 'Zero-one-AI',
      logo: 'https://cdn.prod.website-files.com/65b8f36fa600366bc7cf9a67/6683bfad15f187a61f0bb65e_Yi_logo_icon_light%201.svg',
      color: 'bg-violet-600'
    },
    {
      name: 'Alibaba Cloud',
      logo: 'https://cdn.prod.website-files.com/65b8f36fa600366bc7cf9a67/6683bcee04d01ab03e6c9dac_Group%2010000077803.svg',
      color: 'bg-orange-700'
    }
  ];

  // Logo component with optimized fallback
  const LogoItem = ({ company, index }) => (
    <div key={index} className="flex-shrink-0 px-12">
      <div className="flex items-center gap-3">
        {/* Optimized Logo Image */}
        <div className="relative w-8 h-8 rounded-lg overflow-hidden">
          <LogoImage
            src={company.logo}
            alt={`${company.name} logo`}
            width={32}
            height={32}
            className="w-full h-full object-cover"
            fallback={() => (
              <div className={`w-full h-full ${company.color} rounded-lg flex items-center justify-center text-white text-xs font-bold`}>
                {company.name.charAt(0)}
              </div>
            )}
            quality={90}
            sizes="32px"
          />
        </div>
        {/* Company Name */}
        <span className="text-gray-500 text-2xl font-medium whitespace-nowrap opacity-60">
          {company.name}
        </span>
      </div>
    </div>
  );

  return (
    <section className="bg-black py-20 overflow-hidden">
      <div className="relative">
        {/* Top Row */}
        <div className="mb-8">
          <div className="flex animate-scroll-left">
            {/* Triple the logos for seamless loop */}
            {[...topRowLogos, ...topRowLogos, ...topRowLogos].map((company, index) => (
              <LogoItem key={`top-${index}`} company={company} index={index} />
            ))}
          </div>
        </div>

        {/* Bottom Row */}
        <div>
          <div className="flex animate-scroll-right">
            {/* Triple the logos for seamless loop */}
            {[...bottomRowLogos, ...bottomRowLogos, ...bottomRowLogos].map((company, index) => (
              <LogoItem key={`bottom-${index}`} company={company} index={index} />
            ))}
          </div>
        </div>
      </div>

      {/* CSS Animations */}
      <style jsx>{`
        @keyframes scroll-left {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-33.33%);
          }
        }

        @keyframes scroll-right {
          0% {
            transform: translateX(-33.33%);
          }
          100% {
            transform: translateX(0);
          }
        }

        .animate-scroll-left {
          animation: scroll-left 40s linear infinite;
        }

        .animate-scroll-right {
          animation: scroll-right 30s linear infinite;
        }
      `}</style>
    </section>
  );
}
