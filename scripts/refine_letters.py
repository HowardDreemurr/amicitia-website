"""Build matching J/f/j alternates from the OFL Fraunces sources.

Usage: python refine_letters.py SOURCE_DIRECTORY OUTPUT_DIRECTORY
Requires fonttools[woff] and brotli. Source directory contains Fraunces.ttf,
Fraunces-Italic.ttf and Fraunces-OFL.txt from google/fonts/ofl/fraunces.
J/j use a simple bowl without the original S bend or ball terminal. Italic f
uses the upright f head with an italic slant and its original rounded tail. Upper serifs,
italic slopes are retained. Upright f has a little extra headroom. F is unchanged.
"""
import sys
from pathlib import Path
from fontTools.ttLib import TTFont
from fontTools.varLib.instancer import instantiateVariableFont
from fontTools import subset
from fontTools.pens.svgPathPen import SVGPathPen


def splice(glyph, start, stop, points):
    """Replace a run of a contour with explicit quadratic curve points."""
    from array import array
    from fontTools.ttLib.tables._g_l_y_f import GlyphCoordinates
    old = list(glyph.coordinates)
    flags = list(glyph.flags)
    delta = len(points) - (stop - start)
    glyph.coordinates = GlyphCoordinates(old[:start] + [(x, y) for x, y, on in points] + old[stop:])
    glyph.flags = array('B', flags[:start] + [int(on) for x, y, on in points] + flags[stop:])
    glyph.endPtsOfContours = [end + delta if end >= stop - 1 else end for end in glyph.endPtsOfContours]


def hook(right, left, top, bottom, reach, angle=0):
    """A single flowing bowl with a small rounded end, no ball or S bend."""
    shoulder = bottom + 220
    floor = bottom + 95
    points = [
        (right, shoulder, 1),
        (right, bottom, 0), (left - 60, bottom, 1),
        (reach, bottom, 0), (reach, bottom + 105, 1),
        (reach, bottom + 142, 0), (reach + 33, bottom + 142, 1),
        (reach + 58, bottom + 142, 0), (reach + 77, bottom + 123, 1),
        (reach + 99, floor, 0), (left - 65, floor, 1),
        (left, floor, 0), (left, shoulder, 1),
        (left, top, 1),
    ]
    return [(x + angle*y, y, on) for x, y, on in points]


def refine(font, italic, roman_font=None):
    glyf, cmap = font['glyf'], font.getBestCmap()
    cap_j, f, j = (glyf[cmap[ord(c)]] for c in 'Jfj')
    if not italic:
        assert len(f.coordinates) == 76 and len(cap_j.coordinates) == 51
        # Retain the original ball terminal and its curves. Move the head
        # slightly right so it can join a straight stem without the S bend.
        left, right = f.coordinates[21][0], f.coordinates[0][0]
        cross = f.coordinates[31][1]
        head_shift = 140
        for i in range(42,57):
            x,y = f.coordinates[i]
            f.coordinates[i] = (x+head_shift,y)
        top, inner_top = f.coordinates[42], f.coordinates[56]
        splice(f, 57, 68, [(right,inner_top[1],0),(right,1250,1),(right,cross,1)])
        splice(f, 32, 43, [(left,cross,1),(left,1250,1),(left,top[1],0),(*top,1)])
        advance, bearing = font['hmtx'][cmap[ord('f')]]
        font['hmtx'][cmap[ord('f')]] = (advance+70,bearing)
        # J and j descend directly into a single conventional curved bowl.
        right, left = cap_j.coordinates[46][0], cap_j.coordinates[24][0]
        top = cap_j.coordinates[24][1]
        splice(cap_j, 47, 51, [])
        splice(cap_j, 0, 25, hook(right, left, top, -32, 75))
        right, left = j.coordinates[0][0], j.coordinates[31][0]
        splice(j, 1, 32, hook(right, left, j.coordinates[31][1], -466, -65))
    else:
        assert len(f.coordinates) == 59 and len(j.coordinates) == 57
        # Reuse the upright f head, slanted to the italic stem, and preserve
        # the complete original italic f tail without redrawing its contours.
        angle = .268
        right = f.coordinates[37][0] - angle*f.coordinates[37][1]
        left = f.coordinates[53][0] - angle*f.coordinates[53][1]
        italic_cross, italic_top = f.coordinates[14][1], f.coordinates[18][1]
        assert roman_font is not None
        roman_f = roman_font['glyf'][roman_font.getBestCmap()[ord('f')]]
        roman_left, roman_right = roman_f.coordinates[21][0], roman_f.coordinates[0][0]
        roman_cross = roman_f.coordinates[31][1]
        roman_top = roman_f.coordinates[42]
        inner_top = roman_f.coordinates[56]
        head = [(roman_left,roman_cross,1),(roman_left,1250,1),
                (roman_left,roman_top[1],0),(roman_top[0]+140,roman_top[1],1)]
        head += [(x+140,y,bool(roman_f.flags[i]&1))
                 for i,(x,y) in enumerate(roman_f.coordinates) if 43 <= i <= 56]
        head += [(roman_right,inner_top[1],0),(roman_right,1250,1),(roman_right,roman_cross,1)]
        sx = (right-left)/(roman_right-roman_left)
        sy = (italic_top-italic_cross)/(roman_top[1]-roman_cross)
        slanted_head = []
        for x,y,on in head:
            iy = italic_cross + (y-roman_cross)*sy
            ix = left + (x-roman_left)*sx + angle*iy
            slanted_head.append((ix,iy,on))
        splice(f,15,38,slanted_head)
        angle = .303
        right = j.coordinates[0][0] - angle*j.coordinates[0][1]
        left = j.coordinates[23][0] - angle*j.coordinates[23][1]
        splice(j, 1, 24, hook(right, left, j.coordinates[23][1], -490, -105, angle))
        angle = .267
        right = cap_j.coordinates[8][0] - angle*cap_j.coordinates[8][1]
        left = cap_j.coordinates[32][0] - angle*cap_j.coordinates[32][1]
        splice(cap_j, 9, 33, hook(right, left, cap_j.coordinates[32][1], -385, -80, angle))
    for c in 'Jfj':
        glyph = glyf[cmap[ord(c)]]
        glyph.coordinates.toInt()
        glyph.recalcBounds(glyf)


def rename(font, style, weight):
    family = 'Amicitia Letterforms'
    subfamily = f'{style.title()} {weight}'
    names = {1: family, 2: subfamily, 3: f'{family}-{style}-{weight}-1.0',
             4: f'{family} {subfamily}', 6: f'AmicitiaLetterforms-{style}-{weight}',
             16: family, 17: subfamily}
    for record in font['name'].names:
        if record.nameID in names:
            record.string = names[record.nameID].encode(record.getEncoding())


def svg_letters(font, y, label):
    parts = [f'<text x="32" y="{y-185}" font-family="Arial" font-size="20">{label}</text>']
    glyphs, cmap = font.getGlyphSet(), font.getBestCmap()
    for i, c in enumerate('FJfj'):
        pen = SVGPathPen(glyphs)
        glyphs[cmap[ord(c)]].draw(pen)
        parts.append(f'<path d="{pen.getCommands()}" transform="translate({40+i*215},{y}) scale(.115,-.115)" fill="#2d2420"/>')
    return ''.join(parts)


def main(source, output):
    output.mkdir(parents=True, exist_ok=True)
    rules, specimen = [], []
    for row, style in enumerate(['normal', 'italic']):
        filename = 'Fraunces-Italic.ttf' if style == 'italic' else 'Fraunces.ttf'
        for weight in [400, 500, 600, 700]:
            font = instantiateVariableFont(TTFont(source / filename), {
                'opsz': 14, 'wght': weight, 'SOFT': 0, 'WONK': 1,
            })
            if weight == 600:
                specimen.append(svg_letters(font, 225 + row*540, f'Original {style}'))
            roman_font = instantiateVariableFont(TTFont(source / 'Fraunces.ttf'), {
                'opsz':14, 'wght':weight, 'SOFT':0, 'WONK':1,
            }) if style == 'italic' else None
            refine(font, style == 'italic', roman_font)
            if weight == 600:
                specimen.append(svg_letters(font, 485 + row*540, f'Refined {style}'))
            rename(font, style, weight)
            options = subset.Options()
            options.hinting = False
            options.name_IDs = ['*']
            options.name_legacy = True
            subsetter = subset.Subsetter(options=options)
            subsetter.populate(text='Jfj')
            subsetter.subset(font)
            name = f'amicitia-letterforms-{style}-{weight}.woff2'
            font.flavor = 'woff2'
            font.save(output / name)
            rules.append(f'''@font-face {{
  font-family: 'Amicitia Letterforms';
  font-style: {style};
  font-weight: {weight};
  font-display: swap;
  src: url('/fonts/{name}') format('woff2');
  unicode-range: U+004A, U+0066, U+006A;
}}''')
    (output / 'Fraunces-OFL.txt').write_bytes((source / 'Fraunces-OFL.txt').read_bytes())
    (source / 'letter-alternates.css').write_text(
        '/* J/f/j refined from Fraunces; all other letters use the original font. */\n' + '\n'.join(rules))
    (source / 'refined-letters.svg').write_text(
        '<svg xmlns="http://www.w3.org/2000/svg" width="900" height="1110">'
        '<rect width="900" height="1110" fill="#faf6f0"/>' + ''.join(specimen) + '</svg>')


if __name__ == '__main__':
    main(Path(sys.argv[1]), Path(sys.argv[2]))
