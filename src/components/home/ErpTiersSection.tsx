import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  CheckCircle2,
  ArrowRight,
  Sparkles,
  Sliders,
  Package,
  Layers,
  FileText,
  ShoppingBag,
  Boxes,
  ShieldCheck,
  Scale,
} from 'lucide-react';
import { Container } from '../ui/Container';
import { Card } from '../ui/Card';
import { Button } from '../ui/Button';
import { Badge } from '../ui/Badge';
import { useLanguage } from '../../context/LanguageContext';
import { gsap, prefersReducedMotion } from '../../lib/gsap';

type ActiveTab = 'lite' | 'pro' | 'compare';

export const ErpTiersSection: React.FC = () => {
  const [activeTab, setActiveTab] = useState<ActiveTab>('lite');
  const sectionRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();
  const { t } = useLanguage();

  const handleSelectTier = (tier: 'lite' | 'pro') => {
    navigate(`/contact?tier=${tier}`);
  };

  useEffect(() => {
    if (prefersReducedMotion() || typeof window === 'undefined') return;

    const ctx = gsap.context(() => {
      // Smooth depth entrance handoff from Hero
      if (sectionRef.current) {
        gsap.fromTo(
          sectionRef.current,
          { opacity: 0.85, y: 25 },
          {
            opacity: 1,
            y: 0,
            duration: 0.7,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: sectionRef.current,
              start: 'top 92%',
              end: 'top 60%',
              scrub: 0.5,
            },
          }
        );
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  useEffect(() => {
    if (prefersReducedMotion() || typeof window === 'undefined') return;

    if (contentRef.current) {
      const ctx = gsap.context(() => {
        gsap.fromTo(
          contentRef.current,
          {
            opacity: 0.3,
            y: 10,
            scale: 0.99,
          },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 0.35,
            ease: 'power2.out',
          }
        );
      });

      return () => ctx.revert();
    }
  }, [activeTab]);

  return (
    <section
      ref={sectionRef}
      id="erp-tiers"
      className="py-20 lg:py-28 relative bg-[#FAF8FC]/50 border-b border-[#E9E4F1] overflow-hidden"
      aria-label="ERP Lite and ERP Pro Product Offerings"
    >
      {/* Background ambient lighting */}
      <div className="absolute top-1/2 -left-20 w-96 h-96 bg-[#6D57A5]/5 blur-[120px] rounded-full pointer-events-none" />
      <div className="absolute bottom-10 -right-20 w-96 h-96 bg-[#17B681]/5 blur-[120px] rounded-full pointer-events-none" />

      <Container size="xl" className="space-y-12 relative z-10">
        {/* Section Header */}
        <div className="max-w-3xl mx-auto text-center space-y-4">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white border border-[#E9E4F1] text-[11px] font-mono font-semibold text-[#6D57A5] shadow-xs">
            <Layers className="w-3.5 h-3.5 text-[#17B681]" />
            <span>{t('tiers.eyebrow')}</span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-[#1F1B2D] tracking-tight font-heading leading-tight">
            {t('tiers.title')}{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#6D57A5] to-[#17B681]">
              {t('tiers.titleGradient')}
            </span>
          </h2>

          <p className="text-sm sm:text-base text-[#625D6B] leading-relaxed max-w-2xl mx-auto">
            {t('tiers.description')}
          </p>

          {/* Interactive Tier Switcher Tabs */}
          <div className="pt-4 flex justify-center">
            <div className="inline-flex items-center p-1.5 rounded-2xl bg-white border border-[#E9E4F1] shadow-xs gap-1 max-w-full overflow-x-auto">
              <button
                type="button"
                onClick={() => setActiveTab('lite')}
                className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold transition-all cursor-pointer whitespace-nowrap ${
                  activeTab === 'lite'
                    ? 'bg-[#6D57A5] text-white shadow-sm'
                    : 'text-[#625D6B] hover:text-[#1F1B2D] hover:bg-[#FAF8FC]'
                }`}
                aria-pressed={activeTab === 'lite'}
              >
                <Package className="w-4 h-4" />
                <span>{t('tiers.tabLite')}</span>
              </button>

              <button
                type="button"
                onClick={() => setActiveTab('pro')}
                className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold transition-all cursor-pointer whitespace-nowrap ${
                  activeTab === 'pro'
                    ? 'bg-[#17B681] text-white shadow-sm'
                    : 'text-[#625D6B] hover:text-[#1F1B2D] hover:bg-[#FAF8FC]'
                }`}
                aria-pressed={activeTab === 'pro'}
              >
                <Sliders className="w-4 h-4" />
                <span>{t('tiers.tabPro')}</span>
              </button>

              <button
                type="button"
                onClick={() => setActiveTab('compare')}
                className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold transition-all cursor-pointer whitespace-nowrap ${
                  activeTab === 'compare'
                    ? 'bg-[#1F1B2D] text-white shadow-sm'
                    : 'text-[#625D6B] hover:text-[#1F1B2D] hover:bg-[#FAF8FC]'
                }`}
                aria-pressed={activeTab === 'compare'}
              >
                <Scale className="w-4 h-4" />
                <span>{t('tiers.tabCompare')}</span>
              </button>
            </div>
          </div>
        </div>

        {/* Tab Content Display */}
        <div ref={contentRef}>
          {activeTab === 'lite' && (
            <Card
              variant="default"
              spotlight={true}
              className="bg-white border-2 border-[#6D57A5]/25 shadow-lg rounded-3xl p-6 sm:p-10 lg:p-12 transition-all hover:border-[#6D57A5]/40"
            >
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
                {/* Left Description Column */}
                <div className="lg:col-span-7 space-y-6">
                  <div className="flex items-center gap-2">
                    <Badge variant="brand" size="md">
                      {t('tiers.liteTag')}
                    </Badge>
                    <span className="text-xs font-mono text-[#625D6B]">{t('tiers.standardVersion')}</span>
                  </div>

                  <div className="space-y-2">
                    <h3 className="text-2xl sm:text-3xl font-bold text-[#1F1B2D] font-heading">
                      {t('tiers.liteTitle')} —{' '}
                      <span className="text-[#6D57A5] font-normal">{t('tiers.liteSubtitle')}</span>
                    </h3>
                    <p className="text-xs sm:text-sm text-[#625D6B] leading-relaxed">
                      {t('tiers.liteDesc')}
                    </p>
                  </div>

                  {/* Feature Checklist */}
                  <div className="space-y-2 pt-2">
                    {[
                      t('tiers.liteFeat1'),
                      t('tiers.liteFeat2'),
                      t('tiers.liteFeat3'),
                      t('tiers.liteFeat4'),
                      t('tiers.liteFeat5'),
                    ].map((feature, idx) => (
                      <div
                        key={idx}
                        className="flex items-start gap-3 p-1.5 -mx-1.5 rounded-lg hover:bg-purple-50/50 transition-colors"
                      >
                        <CheckCircle2 className="w-4 h-4 text-[#6D57A5] shrink-0 mt-0.5" />
                        <span className="text-xs sm:text-sm font-medium text-[#1F1B2D]">{feature}</span>
                      </div>
                    ))}
                  </div>

                  <div className="pt-4 flex flex-col sm:flex-row items-center gap-3">
                    <Button
                      variant="primary"
                      size="md"
                      onClick={() => handleSelectTier('lite')}
                      icon={<ArrowRight className="w-4 h-4 rtl:rotate-180" />}
                    >
                      {t('tiers.liteCta')}
                    </Button>
                    <span className="text-xs text-[#625D6B] font-mono">
                      {t('tiers.liteOnboarding')}
                    </span>
                  </div>
                </div>

                {/* Right Visual Architecture Representation */}
                <div className="lg:col-span-5 bg-[#FAF8FC] border border-[#E9E4F1] rounded-2xl p-6 sm:p-8 space-y-4 shadow-inner">
                  <div className="flex items-center justify-between pb-3 border-b border-[#E9E4F1]">
                    <span className="text-[10px] font-mono uppercase tracking-wider text-[#6D57A5] font-bold">
                      {t('tiers.standardPkgArch')}
                    </span>
                    <span className="inline-flex items-center gap-1 text-[10px] font-mono text-[#17B681]">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#17B681] animate-pulse" />
                      {t('tiers.readyToRun')}
                    </span>
                  </div>

                  <div className="space-y-2.5">
                    <div className="p-3 bg-white rounded-xl border border-[#E9E4F1] flex items-center gap-3 shadow-2xs hover:scale-[1.02] hover:border-[#6D57A5]/30 transition-all duration-200 group cursor-default">
                      <div className="w-8 h-8 rounded-lg bg-[#FAF8FC] text-[#6D57A5] flex items-center justify-center shrink-0 group-hover:scale-110 group-hover:bg-[#6D57A5] group-hover:text-white transition-all">
                        <FileText className="w-4 h-4" />
                      </div>
                      <div>
                        <h5 className="text-xs font-bold text-[#1F1B2D] group-hover:text-[#6D57A5] transition-colors">{t('tiers.invoiceStd')}</h5>
                        <p className="text-[11px] text-[#625D6B]">{t('tiers.invoiceStdDesc')}</p>
                      </div>
                    </div>

                    <div className="p-3 bg-white rounded-xl border border-[#E9E4F1] flex items-center gap-3 shadow-2xs hover:scale-[1.02] hover:border-[#17B681]/30 transition-all duration-200 group cursor-default">
                      <div className="w-8 h-8 rounded-lg bg-[#E4F8F0] text-[#17B681] flex items-center justify-center shrink-0 group-hover:scale-110 group-hover:bg-[#17B681] group-hover:text-white transition-all">
                        <ShoppingBag className="w-4 h-4" />
                      </div>
                      <div>
                        <h5 className="text-xs font-bold text-[#1F1B2D] group-hover:text-[#17B681] transition-colors">{t('tiers.posStd')}</h5>
                        <p className="text-[11px] text-[#625D6B]">{t('tiers.posStdDesc')}</p>
                      </div>
                    </div>

                    <div className="p-3 bg-white rounded-xl border border-[#E9E4F1] flex items-center gap-3 shadow-2xs hover:scale-[1.02] hover:border-[#6D57A5]/30 transition-all duration-200 group cursor-default">
                      <div className="w-8 h-8 rounded-lg bg-[#FAF8FC] text-[#6D57A5] flex items-center justify-center shrink-0 group-hover:scale-110 group-hover:bg-[#6D57A5] group-hover:text-white transition-all">
                        <Boxes className="w-4 h-4" />
                      </div>
                      <div>
                        <h5 className="text-xs font-bold text-[#1F1B2D] group-hover:text-[#6D57A5] transition-colors">{t('tiers.inventoryStd')}</h5>
                        <p className="text-[11px] text-[#625D6B]">{t('tiers.inventoryStdDesc')}</p>
                      </div>
                    </div>
                  </div>

                  <div className="p-3 rounded-xl bg-purple-50/60 border border-purple-100 text-[11px] text-[#6D57A5] flex items-center gap-2">
                    <ShieldCheck className="w-4 h-4 shrink-0" />
                    <span>{t('tiers.securityNote')}</span>
                  </div>
                </div>
              </div>
            </Card>
          )}

          {activeTab === 'pro' && (
            <Card
              variant="default"
              spotlight={true}
              className="bg-white border-2 border-[#17B681]/30 shadow-lg rounded-3xl p-6 sm:p-10 lg:p-12 transition-all hover:border-[#17B681]/50"
            >
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
                {/* Left Description Column */}
                <div className="lg:col-span-7 space-y-6">
                  <div className="flex items-center gap-2">
                    <Badge variant="success" size="md">
                      {t('tiers.proTag')}
                    </Badge>
                    <span className="text-xs font-mono text-[#17B681]">{t('tiers.configuredSolution')}</span>
                  </div>

                  <div className="space-y-2">
                    <h3 className="text-2xl sm:text-3xl font-bold text-[#1F1B2D] font-heading">
                      {t('tiers.proTitle')} —{' '}
                      <span className="text-[#17B681] font-normal">{t('tiers.proSubtitle')}</span>
                    </h3>
                    <p className="text-xs sm:text-sm text-[#625D6B] leading-relaxed">
                      {t('tiers.proDesc')}
                    </p>
                  </div>

                  {/* Feature Checklist */}
                  <div className="space-y-2 pt-2">
                    {[
                      t('tiers.proFeat1'),
                      t('tiers.proFeat2'),
                      t('tiers.proFeat3'),
                      t('tiers.proFeat4'),
                      t('tiers.proFeat5'),
                    ].map((feature, idx) => (
                      <div
                        key={idx}
                        className="flex items-start gap-3 p-1.5 -mx-1.5 rounded-lg hover:bg-emerald-50/50 transition-colors"
                      >
                        <CheckCircle2 className="w-4 h-4 text-[#17B681] shrink-0 mt-0.5" />
                        <span className="text-xs sm:text-sm font-medium text-[#1F1B2D]">{feature}</span>
                      </div>
                    ))}
                  </div>

                  <div className="pt-4 flex flex-col sm:flex-row items-center gap-3">
                    <Button
                      variant="primary"
                      size="md"
                      onClick={() => handleSelectTier('pro')}
                      icon={<ArrowRight className="w-4 h-4 rtl:rotate-180" />}
                    >
                      {t('tiers.proCta')}
                    </Button>
                    <span className="text-xs text-[#625D6B] font-mono">
                      {t('tiers.proOnboarding')}
                    </span>
                  </div>
                </div>

                {/* Right Visual Architecture Representation */}
                <div className="lg:col-span-5 bg-[#FAF8FC] border border-[#E9E4F1] rounded-2xl p-6 sm:p-8 space-y-4 shadow-inner">
                  <div className="flex items-center justify-between pb-3 border-b border-[#E9E4F1]">
                    <span className="text-[10px] font-mono uppercase tracking-wider text-[#17B681] font-bold">
                      {t('tiers.customAdaptWorkflow')}
                    </span>
                    <span className="inline-flex items-center gap-1 text-[10px] font-mono text-[#6D57A5]">
                      <Sparkles className="w-3 h-3 text-[#17B681]" />
                      {t('tiers.bespokeStaging')}
                    </span>
                  </div>

                  <div className="space-y-2.5">
                    <div className="p-3 bg-white rounded-xl border border-[#E9E4F1] flex items-center gap-3 shadow-2xs hover:scale-[1.02] hover:border-[#17B681]/30 transition-all duration-200 group cursor-default">
                      <div className="w-8 h-8 rounded-lg bg-emerald-50 text-[#17B681] flex items-center justify-center shrink-0 group-hover:scale-110 group-hover:bg-[#17B681] group-hover:text-white transition-all">
                        <Sliders className="w-4 h-4" />
                      </div>
                      <div>
                        <h5 className="text-xs font-bold text-[#1F1B2D] group-hover:text-[#17B681] transition-colors">{t('tiers.customOps')}</h5>
                        <p className="text-[11px] text-[#625D6B]">{t('tiers.customOpsDesc')}</p>
                      </div>
                    </div>

                    <div className="p-3 bg-white rounded-xl border border-[#E9E4F1] flex items-center gap-3 shadow-2xs hover:scale-[1.02] hover:border-[#6D57A5]/30 transition-all duration-200 group cursor-default">
                      <div className="w-8 h-8 rounded-lg bg-[#FAF8FC] text-[#6D57A5] flex items-center justify-center shrink-0 group-hover:scale-110 group-hover:bg-[#6D57A5] group-hover:text-white transition-all">
                        <FileText className="w-4 h-4" />
                      </div>
                      <div>
                        <h5 className="text-xs font-bold text-[#1F1B2D] group-hover:text-[#6D57A5] transition-colors">{t('tiers.brandedDocs')}</h5>
                        <p className="text-[11px] text-[#625D6B]">{t('tiers.brandedDocsDesc')}</p>
                      </div>
                    </div>

                    <div className="p-3 bg-white rounded-xl border border-[#E9E4F1] flex items-center gap-3 shadow-2xs hover:scale-[1.02] hover:border-[#17B681]/30 transition-all duration-200 group cursor-default">
                      <div className="w-8 h-8 rounded-lg bg-emerald-50 text-[#17B681] flex items-center justify-center shrink-0 group-hover:scale-110 group-hover:bg-[#17B681] group-hover:text-white transition-all">
                        <Boxes className="w-4 h-4" />
                      </div>
                      <div>
                        <h5 className="text-xs font-bold text-[#1F1B2D] group-hover:text-[#17B681] transition-colors">{t('tiers.multiBranchStock')}</h5>
                        <p className="text-[11px] text-[#625D6B]">{t('tiers.multiBranchStockDesc')}</p>
                      </div>
                    </div>
                  </div>

                  <div className="p-3 rounded-xl bg-emerald-50/60 border border-emerald-100 text-[11px] text-[#129267] flex items-center gap-2">
                    <ShieldCheck className="w-4 h-4 shrink-0" />
                    <span>{t('tiers.proSecurityNote')}</span>
                  </div>
                </div>
              </div>
            </Card>
          )}

          {activeTab === 'compare' && (
            <Card
              variant="default"
              className="bg-white border border-[#E9E4F1] shadow-lg rounded-3xl p-6 sm:p-8 lg:p-10 overflow-hidden"
            >
              <div className="space-y-6">
                <div className="text-center space-y-1">
                  <h3 className="text-xl sm:text-2xl font-bold text-[#1F1B2D] font-heading">
                    {t('tiers.compareTitle')}
                  </h3>
                  <p className="text-xs text-[#625D6B]">
                    {t('tiers.compareDesc')}
                  </p>
                </div>

                <div className="overflow-x-auto pb-1 scrollbar-none">
                  <table className="w-full min-w-[500px] text-xs text-start">
                    <thead className="bg-[#FAF8FC] text-[#625D6B] font-mono uppercase tracking-wider text-[11px] border-b border-[#E9E4F1]">
                      <tr>
                        <th className="py-3 px-4 font-bold w-1/4">{t('tiers.dimension')}</th>
                        <th className="py-3 px-4 font-bold text-[#6D57A5] w-3/8">
                          <span className="inline-flex items-center gap-1.5">
                            <span className="w-2 h-2 rounded-full bg-[#6D57A5]" />
                            {t('tiers.liteTitle')}
                          </span>
                        </th>
                        <th className="py-3 px-4 font-bold text-[#17B681] w-3/8">
                          <span className="inline-flex items-center gap-1.5">
                            <span className="w-2 h-2 rounded-full bg-[#17B681]" />
                            {t('tiers.proTitle')}
                          </span>
                        </th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-[#E9E4F1]">
                      <tr className="hover:bg-[#FAF8FC]/80 transition-colors">
                        <td className="py-3.5 px-4 font-bold text-[#1F1B2D]">{t('tiers.dimDeployment')}</td>
                        <td className="py-3.5 px-4 text-[#625D6B]">{t('tiers.liteDeployment')}</td>
                        <td className="py-3.5 px-4 text-[#1F1B2D] font-medium">{t('tiers.proDeployment')}</td>
                      </tr>
                      <tr className="bg-[#FAF8FC]/40 hover:bg-[#FAF8FC]/90 transition-colors">
                        <td className="py-3.5 px-4 font-bold text-[#1F1B2D]">{t('tiers.dimWorkflows')}</td>
                        <td className="py-3.5 px-4 text-[#625D6B]">{t('tiers.liteWorkflows')}</td>
                        <td className="py-3.5 px-4 text-[#1F1B2D] font-medium">{t('tiers.proWorkflows')}</td>
                      </tr>
                      <tr className="hover:bg-[#FAF8FC]/80 transition-colors">
                        <td className="py-3.5 px-4 font-bold text-[#1F1B2D]">{t('tiers.dimCustomization')}</td>
                        <td className="py-3.5 px-4 text-[#625D6B]">{t('tiers.liteCustomization')}</td>
                        <td className="py-3.5 px-4 text-[#1F1B2D] font-medium">{t('tiers.proCustomization')}</td>
                      </tr>
                      <tr className="bg-[#FAF8FC]/40 hover:bg-[#FAF8FC]/90 transition-colors">
                        <td className="py-3.5 px-4 font-bold text-[#1F1B2D]">{t('tiers.dimInventory')}</td>
                        <td className="py-3.5 px-4 text-[#625D6B]">{t('tiers.liteInventory')}</td>
                        <td className="py-3.5 px-4 text-[#1F1B2D] font-medium">{t('tiers.proInventory')}</td>
                      </tr>
                      <tr className="hover:bg-[#FAF8FC]/80 transition-colors">
                        <td className="py-3.5 px-4 font-bold text-[#1F1B2D]">{t('tiers.dimSupport')}</td>
                        <td className="py-3.5 px-4 text-[#625D6B]">{t('tiers.liteSupport')}</td>
                        <td className="py-3.5 px-4 text-[#1F1B2D] font-medium">{t('tiers.proSupport')}</td>
                      </tr>
                    </tbody>
                  </table>
                </div>

                <div className="pt-4 flex flex-col sm:flex-row justify-center gap-3 sm:gap-4 text-center items-stretch sm:items-center">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleSelectTier('lite')}
                  >
                    {t('tiers.liteCta')}
                  </Button>
                  <Button
                    variant="primary"
                    size="sm"
                    onClick={() => handleSelectTier('pro')}
                  >
                    {t('tiers.proCta')}
                  </Button>
                </div>
              </div>
            </Card>
          )}
        </div>

        {/* Narrative Continuity Handoff: From Scale Choice to the Six Operational Pillars */}
        <div className="pt-6 border-t border-[#E9E4F1]/80 flex flex-col sm:flex-row items-center justify-between gap-4 p-4 rounded-2xl bg-white border border-[#E9E4F1] shadow-2xs">
          <div className="space-y-0.5 text-center sm:text-start">
            <span className="text-[10px] font-mono text-[#6D57A5] uppercase tracking-wider font-bold block">
              {t('tiers.scaleChosen')}
            </span>
            <p className="text-xs text-[#625D6B]">
              {t('tiers.exploreSixAreas')}
            </p>
          </div>

          <a
            href="#core-modules"
            className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-[#FAF8FC] border border-[#E9E4F1] text-xs font-semibold text-[#1F1B2D] hover:text-[#6D57A5] hover:border-[#6D57A5]/40 hover:bg-white shadow-2xs transition-all shrink-0"
          >
            <span>{t('whatIs.coreModules')}</span>
            <ArrowRight className="w-3.5 h-3.5 text-[#17B681] rtl:rotate-180" />
          </a>
        </div>
      </Container>
    </section>
  );
};
