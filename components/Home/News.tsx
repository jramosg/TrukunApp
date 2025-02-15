import { View, ViewProps, Dimensions, Image, Pressable } from "react-native";
import Carousel, { CarouselRenderItem } from "react-native-reanimated-carousel";
import { AnimatedProps } from "react-native-reanimated";
import { useTranslation } from "react-i18next";
import { Link, router } from "expo-router";
import Card from "@/components/Card";
import { ThemedText } from "@/components/ThemedText";
import styles from "./styles";
import { useState } from "react";

// Update the NewsItem interface to include a description
interface NewsItem {
  image: string;
  title: string;
  section: string;
  description: string;
  id: string;
}

const exampleNews: NewsItem[] = [
  {
    id: "1",
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQkRSAnwLq3wEXbpOUKN3Mjnq7QShOxlDD7X-c0nFmgXifb9b2Halbcl7FaHrZSoZiIvrQ&usqp=CAU",
    title: "Arrasateko atletiko taldeak 5 domina.",
    section: "KIROLA",
    description:
      "Asteburu honetan Anoetako belodromoan 18 eta 20 urtez azpiko txapelketa...",
  },
  {
    id: "2",
    image:
      "https://mondraberri.eus/wp-content/uploads/2025/02/Captura-de-pantalla-2025-02-15-a-las-14.25.18-e1739625957443.png",
    title:
      "Begisarek Biogipuzkoari dohaintza bat eman dio erretinako gaixotasun hereditarioak ikertzeko",
    section: "ZIENTZIA",
    description:
      "Otsailaren 6an, Biogipuzkoa Osasun Ikerketa Institutuak Retina Euskadi Begisare Elkarteko kideen bisita jaso zuen, eta 22.000 euroko txeke bat eman zuen, gaixotasun horien ikerketa sustatzeko lanari jarraipena emateko. Elkarte horrek erretina-distrofia hereditarioak eta ikusmen txikia eta itsutasuna eragiten duten beste gaixotasun batzuk dituzten pertsonei laguntzen die.",
  },
  {
    id: "3",
    image:
      "https://mondraberri.eus/wp-content/uploads/2025/02/OAMENDI-TXANGOA-2025-GOIENAGUSI-696x522.jpg",
    title: "Oamendira igo dira Goienagusiko 55 lagun bista ederrekin",
    section: "AISIALDIA",
    description:
      "A zer eguna gaurkoa! Orain 3 urte ez bezala, gaurkoan bai, giro zoragarria izan dugu, eta Oamendik eskeintzen dituen bista ederrak gozatu egin ahal izan ditugu, bere osotasunean.",
  },
  {
    id: "4",
    image:
      "https://mondraberri.eus/wp-content/uploads/2023/06/SANJOANAK23-ZUKEINZEUKJAN-696x398.jpg",
    title:
      "Ireki da Zeuk Eiñ Zeuk Jan-eko izen-ematea; gehienez 1.000 pertsona",
    section: "SANJUANAK",
    description:
      "Otordua Azoka Plazan ospatuko da ekainaren 25ean. “Interesa duten pertsonek Udalaren webgunean eman ahal izango dute izena ekainaren 12tik 17ra edo lekua bete arte”.",
  },
];

interface SlideItemProps extends AnimatedProps<ViewProps> {
  index?: number;
  new: NewsItem;
  scroll: boolean;
}

const SlideItem: React.FC<SlideItemProps> = ({
  new: { image, title, section, description, id },
  scroll,
}) => {
  console.log(scroll);
  return (
    <Pressable
      style={({ pressed }) => [{ opacity: pressed ? 0.7 : 1.0 }]}
      onPress={() => {
        if (!scroll) {
          router.navigate(`/news/${id}`);
        }
      }}
    >
      <Card elevation={5} style={styles.card}>
        <Image source={{ uri: image }} style={[styles.image]} />
        <View style={[styles.newsContainer]}>
          <ThemedText color="secondaryText" type="card-title">
            {section}
          </ThemedText>
          <ThemedText type="subhead" numberOfLines={1} ellipsizeMode="tail">
            {title}
          </ThemedText>
        </View>
        <View style={[styles.newsContainer]}>
          <ThemedText
            color="secondaryText"
            numberOfLines={2}
            ellipsizeMode="tail"
          >
            {description}
          </ThemedText>
        </View>
      </Card>
    </Pressable>
  );
};

const renderItem: CarouselRenderItem<NewsItem> = (props) => {
  console.log(props);
  return (
    <SlideItem
      key={props.index}
      index={props.index}
      new={props.item}
      scroll={props.scroll}
    />
  );
};

function HomeNews() {
  const window = Dimensions.get("window");
  const { t } = useTranslation();
  const [scroll, setScroll] = useState<boolean>(false);

  return (
    <View>
      <ThemedText type="subhead" style={[styles.paddingHor]}>
        {t("Albisteak")}
      </ThemedText>
      <View testID="carousel-component">
        <Carousel
          data={exampleNews}
          loop
          height={280}
          pagingEnabled
          snapEnabled
          width={window.width}
          style={{ width: window.width * 1 }}
          mode="parallax"
          modeConfig={{
            parallaxScrollingScale: 0.9,
            parallaxScrollingOffset: 50,
          }}
          renderItem={(props) => renderItem({ ...props, scroll: scroll })}
          onScrollStart={() => setScroll(true)}
          onScrollEnd={() => setScroll(false)}
        />
      </View>
    </View>
  );
}

export default HomeNews;
