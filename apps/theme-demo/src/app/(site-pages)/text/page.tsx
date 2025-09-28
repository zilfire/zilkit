'use client';

import { Section, Container } from '@zilfire/core-theme/web/components';
import { Text, P, UL, OL, LI, H1, H2, H3, H4, H5 } from '@zilfire/core-theme/web/text';
import { useState } from 'react';

type TextSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl' | 'xxl';

export default function TextPage() {
  const [textSize, setTextSize] = useState<TextSize>('md');

  const textSizes: TextSize[] = ['xs', 'sm', 'md', 'lg', 'xl', 'xxl'];

  return (
    <Section>
      <Container>
        {/* Text Size Control */}
        <div className="mb-8 p-4 bg-gray-100 rounded-lg">
          <label htmlFor="text-size" className="block text-sm font-medium text-gray-700 mb-2">
            Choose Text Size:
          </label>
          <select
            id="text-size"
            value={textSize}
            onChange={(e) => setTextSize(e.target.value as TextSize)}
            className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            {textSizes.map((size) => (
              <option key={size} value={size}>
                {size.toUpperCase()}
              </option>
            ))}
          </select>
        </div>

        {/* Typography Showcase */}
        <H1 textSize={textSize}>H1: The Complete Typography Guide</H1>

        <P textSize={textSize}>
          This comprehensive guide showcases all typography components available in our modern
          design system, demonstrating how each element contributes to creating exceptional user
          experiences. Typography is the art and technique of arranging type to make written
          language legible, readable, and visually appealing when displayed across various devices
          and screen sizes. From establishing proper information hierarchy to ensuring accessibility
          compliance, every typographic choice plays a crucial role in how users interact with and
          comprehend your content.
        </P>

        <H2 textSize={textSize}>H2: Heading Hierarchy</H2>

        <P textSize={textSize}>
          Proper heading hierarchy is absolutely crucial for both accessibility and search engine
          optimization. Our carefully crafted system provides five distinct levels of headings, each
          with unique visual weight, spacing, and semantic meaning designed to create clear, logical
          content structure that guides users through your information architecture. This
          hierarchical approach not only improves readability and user experience but also helps
          screen readers navigate content effectively and assists search engines in understanding
          your page structure and content relationships.
        </P>

        <H3 textSize={textSize}>H3: Primary Headings (H1)</H3>
        <P textSize={textSize}>
          Use H1 exclusively for page titles and main content headers, as they serve as the primary
          entry point for both users and search engines to understand your page's purpose and topic.
          There should typically be only one H1 per page to maintain proper document structure,
          accessibility standards, and SEO best practices. This singular H1 approach helps establish
          a clear content hierarchy that screen readers can navigate efficiently while providing
          search engines with unambiguous signals about your page's main subject matter and focus.
        </P>

        <H4 textSize={textSize}>H4: Secondary Headings (H2-H4)</H4>
        <P textSize={textSize}>
          Secondary headings play a vital role in organizing content into logical, scannable
          sections that improve both user experience and content comprehension. H2 elements are
          perfect for major section breaks and primary topic divisions, while H3 and H4 provide
          additional subdivision capabilities that allow for granular content organization. This
          multi-level approach enables you to create detailed information architectures that guide
          readers through complex topics while maintaining clear relationships between different
          content sections and subsections.
        </P>

        <H5 textSize={textSize}>H5: Minor Headings (H5)</H5>
        <P textSize={textSize}>
          H5 elements are ideally suited for subsections within detailed content areas, component
          labels, feature callouts, and other specialized content that requires visual separation
          without the weight of larger headings. These minor headings help create micro-hierarchies
          within larger content blocks, making it easier for users to scan and locate specific
          information while maintaining the overall document structure and readability that larger
          headings establish.
        </P>

        <H2 textSize={textSize}>H2: Paragraph Text</H2>

        <P textSize={textSize}>
          Paragraph text forms the absolute foundation of readable content across digital platforms
          and serves as the primary vehicle for conveying detailed information, explanations, and
          narratives to your audience. Our carefully designed paragraph component provides
          consistent spacing, optimized line height, and typography that enhances readability across
          all devices and screen sizes. This component has been meticulously crafted to ensure
          comfortable reading experiences whether users are on mobile phones, tablets, desktop
          computers, or any other device, while maintaining visual consistency and accessibility
          standards throughout your entire application or website.
        </P>

        <P textSize={textSize}>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt
          ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation
          ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in
          reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur
          sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id
          est laborum. Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium
          doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et
          quasi architecto beatae vitae dicta sunt explicabo.
        </P>

        <P textSize={textSize}>
          Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia
          consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. Neque porro quisquam
          est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed quia non
          numquam eius modi tempora incidunt ut labore et dolore magnam aliquam quaerat voluptatem.
          Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam,
          nisi ut aliquid ex ea commodi consequatur. Quis autem vel eum iure reprehenderit qui in ea
          voluptate velit esse quam nihil molestiae consequatur.
        </P>

        <H2 textSize={textSize}>H2: List Components</H2>

        <P textSize={textSize}>
          Lists serve as powerful organizational tools that help present information in scannable,
          digestible formats that improve user comprehension and content accessibility. Our
          comprehensive list system supports both unordered (bulleted) and ordered (numbered) lists
          with consistent styling, proper spacing, and semantic HTML structure that ensures optimal
          performance across all devices, screen readers, and assistive technologies while
          maintaining visual harmony with other typography components.
        </P>

        <H3 textSize={textSize}>H3: Unordered Lists</H3>
        <P textSize={textSize}>
          Use unordered lists for items where sequence doesn't matter and you want to present
          related information in a scannable format that emphasizes equal importance across all
          items:
        </P>

        <UL>
          <LI textSize={textSize}>
            Responsive typography that scales seamlessly across all devices and screen sizes,
            ensuring optimal readability whether users are on mobile phones, tablets, desktops, or
            large displays
          </LI>
          <LI textSize={textSize}>
            Accessible color contrast ratios that meet or exceed WCAG 2.1 guidelines for
            readability, ensuring content remains legible for users with visual impairments or in
            challenging lighting conditions
          </LI>
          <LI textSize={textSize}>
            Consistent vertical rhythm and spacing that creates harmonious layouts and improves
            content flow by maintaining predictable relationships between different typography
            elements
          </LI>
          <LI textSize={textSize}>
            Multiple text size options designed for different contexts and use cases, from small
            captions and labels to large display headings and everything in between
          </LI>
          <LI textSize={textSize}>
            Semantic HTML structure that provides better SEO performance and screen reader
            compatibility while maintaining clean, accessible markup that search engines can easily
            understand and index
          </LI>
        </UL>

        <H3 textSize={textSize}>H3: Ordered Lists</H3>
        <P textSize={textSize}>
          Use ordered lists for step-by-step instructions, ranked items, or any content where
          sequence and order are important for understanding or completion:
        </P>

        <OL>
          <LI textSize={textSize}>
            Choose the appropriate heading level for your content based on the information hierarchy
            and ensure it logically flows from higher-level headings without skipping levels
            unnecessarily
          </LI>
          <LI textSize={textSize}>
            Write clear, descriptive heading text that accurately represents the content that
            follows and helps users quickly understand what information they'll find in each section
          </LI>
          <LI textSize={textSize}>
            Use paragraph text for detailed explanations, supporting information, and narrative
            content that requires more space and context than headings or list items can provide
          </LI>
          <LI textSize={textSize}>
            Organize related information using lists when you have multiple items that share common
            characteristics or belong to the same category, making content easier to scan and digest
          </LI>
          <LI textSize={textSize}>
            Test your typography across different screen sizes and devices to ensure consistent
            readability and visual hierarchy, paying special attention to how line lengths, spacing,
            and font sizes adapt to various viewport dimensions and resolution densities
          </LI>
          <LI textSize={textSize}>
            Ensure proper color contrast for accessibility by testing all text and background color
            combinations against WCAG guidelines, and consider how colors appear to users with
            different types of color vision deficiencies
          </LI>
        </OL>

        <H2 textSize={textSize}>H2: Best Practices</H2>

        <P textSize={textSize}>
          Following established typography best practices ensures your content is both visually
          beautiful and functionally accessible to all users, regardless of their device, abilities,
          or browsing context. These fundamental principles serve as the foundation for creating
          exceptional user experiences that prioritize readability, accessibility, and performance
          while maintaining aesthetic appeal and brand consistency across your entire digital
          presence.
        </P>

        <H3 textSize={textSize}>H3: Accessibility Considerations</H3>

        <UL>
          <LI textSize={textSize}>
            Maintain sufficient color contrast ratios with a minimum of 4.5:1 for normal text and
            3:1 for large text to ensure readability for users with visual impairments and in
            various lighting conditions
          </LI>
          <LI textSize={textSize}>
            Use proper semantic HTML elements consistently to provide screen readers and assistive
            technologies with the structural information they need to navigate and interpret your
            content effectively
          </LI>
          <LI textSize={textSize}>
            Ensure all text content remains readable and functional when zoomed to 200%
            magnification without horizontal scrolling, accommodating users who require larger text
            for comfortable reading
          </LI>
          <LI textSize={textSize}>
            Provide comprehensive alternative text descriptions for any text that appears within
            images, ensuring screen reader users have access to all textual information presented
            visually
          </LI>
        </UL>

        <H3 textSize={textSize}>H3: Performance Tips</H3>

        <OL>
          <LI textSize={textSize}>
            Use system fonts whenever possible to reduce page load times and eliminate font download
            delays that can cause layout shifts and degrade user experience, especially on slower
            connections
          </LI>
          <LI textSize={textSize}>
            Optimize custom web fonts using font-display: swap property to ensure text remains
            visible during font loading and provide fallback fonts that closely match your custom
            typography
          </LI>
          <LI textSize={textSize}>
            Minimize the number of font weights, styles, and character sets loaded to reduce
            bandwidth usage and improve page performance while maintaining design flexibility and
            visual hierarchy
          </LI>
          <LI textSize={textSize}>
            Regularly test your typography performance on slower network connections and older
            devices to ensure optimal user experience across all user scenarios and technical
            constraints
          </LI>
        </OL>

        <P textSize={textSize}>
          This comprehensive text component showcase demonstrates how our thoughtfully designed
          typography system creates consistent, readable, and accessible content experiences across
          your entire application ecosystem. Take time to experiment with different text sizes using
          the interactive dropdown control above to see how each component adapts and scales while
          maintaining optimal readability and visual hierarchy. Understanding these typography
          fundamentals will help you create more effective and engaging user interfaces that serve
          your users' needs while supporting your content goals and business objectives.
        </P>
      </Container>
    </Section>
  );
}
